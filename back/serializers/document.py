from rest_framework import serializers
from back.models import Document


class DocumentListSerializer(serializers.ModelSerializer):
    backend_action = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = [
            "id",
            "name",
            "file",
            "filled_file",
            "project",
            "hazardous_work",
            "deleted",
            "backend_action",
            ]

    def get_backend_action(self, obj):
        return "None"


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


class PredefinedDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"

    def create(self, validated_data):
        project = validated_data.pop("project")
        template = validated_data.pop("template")
        file_to_copy = template.file
        document = Document.objects.create(
            project=project, template=template, file=file_to_copy, **validated_data
        )
        return document
