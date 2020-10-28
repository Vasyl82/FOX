from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Contractor, Company
from back.serializers import (
    ContractorSerializer,
    ContractorListSerializer,
    ContractorCreateSerializer,
)


class ContractorList(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorListSerializer

    def get_queryset(self):
        user = self.request.user
        return Contractor.objects.filter(companies=user.company, deleted=False)


class ContractorCreate(generics.CreateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorCreateSerializer


class ContractorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer

    def get_queryset(self):
        user = self.request.user
        return Contractor.objects.filter(companies=user.company, deleted=False)

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        contractor = get_object_or_404(queryset, pk=pk)
        contractor.companies.remove(request.user.company)
        if contractor.companies.count() < 1:
            contractor.deleted = True
            now = timezone.now().strftime("%d-%m-%y %H:%M")
            contractor.username += f"(deleted-{now})"
            contractor.email += f"(deleted-{now})"
            contractor.save()
        return JsonResponse(
            data={"response": f"Сontractor {contractor.username} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class ContractorAddCompany(APIView):
    def patch(self, request, pk):
        contractor = get_object_or_404(Contractor, pk=pk)
        company = get_object_or_404(Company, pk=request.data["company_id"])
        contractor.companies.add(company)
        serializer = ContractorSerializer(contractor)
        return Response(data=serializer.data)
