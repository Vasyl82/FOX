from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from back.models import WorkerSpecialCompetency
from back.serializers import (
    WorkerSpecialCompetencySerializer,
    WorkerSpecialCompetencyListSerializer,
)
from back.services import DocumentFileService


class WorkerSpecialCompetencyList(generics.ListAPIView):
    queryset = WorkerSpecialCompetency.objects.all()
    serializer_class = WorkerSpecialCompetencyListSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["worker_id"]

    def get_queryset(self):
        user = self.request.user

        if user.role == "Contr":
            return WorkerSpecialCompetency.objects.filter(
                worker__contractor=user, deleted=False
            )
        return WorkerSpecialCompetency.objects.filter(
            worker__contractor__company=user.company, deleted=False
        )


class WorkerSpecialCompetencyCreate(generics.CreateAPIView):
    queryset = WorkerSpecialCompetency.objects.all()
    serializer_class = WorkerSpecialCompetencySerializer


class WorkerSpecialCompetencyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkerSpecialCompetency.objects.all()
    serializer_class = WorkerSpecialCompetencySerializer

    def get_queryset(self):
        user = self.request.user

        if user.role == "Contr":
            return WorkerSpecialCompetency.objects.filter(
                worker__contractor=user, deleted=False
            )
        return WorkerSpecialCompetency.objects.filter(
            worker__contractor__company=user.company, deleted=False
        )

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        competency = get_object_or_404(queryset, pk=pk)
        competency.deleted = True
        competency.save()
        return JsonResponse(
            data={"response": f"competency {competency.name} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class WorkerSpecialCompetencyDownload(APIView):
    def get(self, request, pk, format=None):
        competency = DocumentFileService(pk, WorkerSpecialCompetency)
        response = HttpResponse(
            competency.read(), content_type="application/octet-stream"
        )
        response["Content-Disposition"] = f"attachment; filename={competency.name}"
        return response
