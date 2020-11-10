from rest_framework import serializers
from back.models import Contractor

# , FoxUser


class ContractorListSerializer(serializers.ModelSerializer):

    contact_person = serializers.SerializerMethodField()
    # company_or_organization = serializers.CharField(source="related_company")

    class Meta:
        model = Contractor
        fields = [
            "id",
            "username",
            "related_company",
            "contact_person",
            "company_phone",
        ]

    def get_contact_person(self, obj):
        return obj.name

    # class ContractorCreateSerializer(serializers.ModelSerializer):

    #     default = ""
    #     email = serializers.EmailField(required=True)

    # def validate_email(self, value):
    #     user = FoxUser.objects.filter(email=value).first()
    #     if user is None:
    #         return value
    #     if user.role != FoxUser.Role.contractor.value:
    #         raise serializers.ValidationError(
    #             "A user with that email already exists", 400
    #         )
    #     raise serializers.ValidationError(
    #         {
    #             "contractor_already_exists": "The email you're trying to use is already occupied by contractor"
    #             + " with username '{0}' from company {1} (contact person: {2}).".format(
    #                 user.username, user.contractor.related_company, user.name
    #             ),
    #             "companies": [
    #                 company.id for company in user.contractor.companies.all()
    #             ],
    #             "contractor_id": user.pk,
    #         },
    #         403,
    #     )

    # class Meta:
    #     model = Contractor
    #     fields = [
    #         "id",
    #         "username",
    #         "name",
    #         "email",
    #         # "companies",
    #         "company_phone",
    #         "role",
    #         "related_company",
    #         "company",
    #     ]


class ContractorSerializer(serializers.ModelSerializer):

    default = ""

    class Meta:
        model = Contractor
        fields = [
            "id",
            "username",
            "name",
            "email",
            # "companies",
            "company_phone",
            "role",
            "related_company",
            "company",
        ]
