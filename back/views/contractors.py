from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.views import APIView
from back.services import SignatureService

# from rest_framework.views import APIView
# from rest_framework.response import Response
from back.models import Contractor

# , Company
from back.serializers import (
    ContractorSerializer,
    ContractorListSerializer,
    # ContractorCreateSerializer,
)


class ContractorList(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorListSerializer

    def get_queryset(self):
        user = self.request.user
        return Contractor.objects.filter(company=user.company, deleted=False)


class ContractorCreate(generics.CreateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer


class ContractorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer

    def get_queryset(self):
        user = self.request.user
        return Contractor.objects.filter(company=user.company, deleted=False)

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        contractor = get_object_or_404(queryset, pk=pk)
        contractor.deleted = True
        now = timezone.now().strftime("%d-%m-%y %H:%M")
        contractor.username += f"(deleted-{now})"
        contractor.email += f"(deleted-{now})"
        contractor.save()
        return JsonResponse(
            data={"response": f"Сontractor {contractor.username} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class ContractorSignature(APIView):
    def get(self, request, pk, format=None):
        try:
            signature = SignatureService(pk, Contractor)
            response = HttpResponse(
                signature.read(), content_type="application/octet-stream"
            )
            response["Content-Disposition"] = f"attachment; filename={signature.name}"
            return response
        except FileNotFoundError:
            raise Http404("File not found.")
