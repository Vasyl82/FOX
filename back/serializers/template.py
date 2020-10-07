from back.models import Template
from rest_framework import serializers


class TemplateListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    hazardous_work = serializers.CharField(read_only=True)

    class Meta:
        model = Template
        fields = ["id", "name", "hazardous_work"]


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = "__all__"
