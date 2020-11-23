from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from back.models import Document
from back.serializers import (
    DocumentSerializer,
    DocumentListSerializer,
    PredefinedDocumentSerializer,
)
from back.services import (
    DocumentFileService,
    DocumentFileJWTCreator,
    DocumentFileJWTReader,
    FilledDocumentFileService,
)


class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentListSerializer

    def get_queryset(self):
        if self.request.query_params["project_id"]:
            return Document.objects.filter(
                deleted=False, project__pk=self.request.query_params["project_id"]
            )
        return Document.objects.none()


class DocumentCreate(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class PredefinedDocumentCreate(generics.CreateAPIView):
    serializer_class = PredefinedDocumentSerializer
    queryset = Document.objects.all()


class DocumentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(deleted=False)

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        document = get_object_or_404(queryset, pk=pk)
        document.deleted = True
        document.save()
        return JsonResponse(
            data={"response": f"document {document.name} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class DocumentDownload(APIView):
    def get(self, request, pk, format=None):
        try:
            document = DocumentFileService(pk, Document)
            response = HttpResponse(
                document.read(), content_type="application/octet-stream"
            )
            response["Content-Disposition"] = f"attachment; filename={document.name}"
            return response
        except FileNotFoundError:
            raise Http404("File not found.")


class FilledDocumentFileDownload(APIView):
    def get(self, request, pk, format=None):
        try:
            document = FilledDocumentFileService(pk, Document)
            response = HttpResponse(
                document.read(), content_type="application/octet-stream"
            )
            response["Content-Disposition"] = f"attachment; filename={document.name}"
            return response
        except FileNotFoundError:
            raise Http404("File not found.")


class DocumentDisplayPermission(APIView):
    def get(self, request, pk, format=None):

        jwt_creator = DocumentFileJWTCreator(pk=pk)

        return JsonResponse(
            {"parts": jwt_creator.parts, "doc_type": jwt_creator.doc_type}
        )


def download_file_to_display(request, part1, part2, part3):
    try:
        file_reader = DocumentFileJWTReader(part1=part1, part2=part2, part3=part3)
        response = HttpResponse(
            file_reader.read(), content_type="application/octet-stream"
        )
        response["Content-Disposition"] = f"attachment; filename={file_reader.name}"
        return response
    except FileNotFoundError:
        raise Http404("File not found.")
