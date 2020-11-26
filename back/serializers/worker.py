from rest_framework import serializers
from back.models import Worker


class WorkerListSerializer(serializers.ModelSerializer):

    position_in_company = serializers.SerializerMethodField()

    class Meta:
        model = Worker

        fields = ["id", "name", "position_in_company", "card_number_id", "passport"]

    def get_position_in_company(self, obj):
        return Worker.Position(obj.position_in_company).label


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker

        fields = "__all__"
