from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from back.models import Contractor
from back.serializers import ContractorSerializer, ContractorListSerializer


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
        contractor.username += f"(deleted-{timezone.now().strftime('%d-%m-%y %H:%M')})"
        contractor.email += f"(deleted-{timezone.now().strftime('%d-%m-%y %H:%M')})"
        contractor.save()
        return JsonResponse(
            data={"response": f"Сontractor {contractor.username} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )
