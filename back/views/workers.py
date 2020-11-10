from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from back.models import Worker, Contractor
from back.serializers import WorkerListSerializer, WorkerSerializer


class WorkerList(generics.ListAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerListSerializer

    def get_queryset(self):
        user = self.request.user

        if user.role == "Contr":
            return Worker.objects.filter(contractor=user, deleted=False)
        contractor_id = self.request.query_params.get("contractor_id", None)
        project_id = self.request.query_params.get("project_id", None)
        if project_id:
            return Worker.objects.filter(projects__id=project_id, deleted=False)
        if contractor_id:
            contractor = Contractor.objects.get(pk=contractor_id)
            return Worker.objects.filter(contractor=contractor, deleted=False)


class WorkerCreate(generics.CreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

    def get_queryset(self):
        user = self.request.user

        if user.role == "Contr":
            return Worker.objects.filter(contractor=user, deleted=False)
        return Worker.objects.filter(contractor__company=user.company, deleted=False)

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        worker = get_object_or_404(queryset, pk=pk)
        worker.deleted = True
        worker.save()
        return JsonResponse(
            data={"response": f"worker {worker.name} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class WorkerDocDownload(APIView):
    def get(self, request, pk, doctype, format=None):
        worker = Worker.objects.get(pk=pk)
        document = getattr(worker, doctype)
        document.open("rb")
        response = HttpResponse(
            document.read(), content_type="application/octet-stream"
        )
        response["Content-Disposition"] = f"attachment; filename={document.name}"
        return response
