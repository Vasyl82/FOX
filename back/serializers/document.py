from rest_framework import serializers
from back.models import Document


class DocumentListSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(read_only=True, source="project.name")
    filename = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ["id", "name", "project_name", "template", "url_to_doc", "filename"]

    def get_filename(self, obj):
        return obj.file.name


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
