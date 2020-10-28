from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext as _
from rest_framework_jwt.compat import get_username_field, PasswordField, Serializer


User = get_user_model()
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER


FoxUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    company_name = serializers.ReadOnlyField(source="company.name")

    class Meta:
        model = FoxUser
        fields = ("id", "email", "username", "name", "role", "company_name", "company")


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = FoxUser
        fields = ("token", "username", "password", "role")


class FoxJSONWebTokenSerializer(Serializer):
    """
    Serializer class used to validate a username and password.

    'username' is identified by the custom UserModel.USERNAME_FIELD.

    Returns a JSON Web Token that can be used to authenticate later calls.
    """

    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(FoxJSONWebTokenSerializer, self).__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields["password"] = PasswordField(write_only=True)

    @property
    def username_field(self):
        return get_username_field()

    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            "password": attrs.get("password"),
        }

        if all(credentials.values()):
            user = authenticate(**credentials)

            if user:
                if not user.is_active or user.deleted:
                    msg = _("User account is disabled.")
                    raise serializers.ValidationError(msg)

                payload = jwt_payload_handler(user)

                return {"token": jwt_encode_handler(payload), "user": user}
            else:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg)
        else:
            msg = _('Must include "{username_field}" and "password".')
            msg = msg.format(username_field=self.username_field)
            raise serializers.ValidationError(msg)
