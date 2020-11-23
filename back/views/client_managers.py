from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from back.models import ClientManager
from back.serializers import ClientManagerSerializer, ClientManagerListSerializer


class ClientManagerList(generics.ListAPIView):
    serializer_class = ClientManagerListSerializer

    def get_queryset(self):
        user = self.request.user
        return ClientManager.objects.filter(company=user.company, deleted=False)


class ClientManagerCreate(generics.CreateAPIView):

    queryset = ClientManager.objects.all()
    serializer_class = ClientManagerSerializer


class ClientManagerDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClientManagerSerializer

    def get_queryset(self):
        user = self.request.user
        return ClientManager.objects.filter(company=user.company, deleted=False)

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        manager = get_object_or_404(queryset, pk=pk)
        manager.deleted = True
        now = timezone.now().strftime("%d-%m-%y %H:%M")
        manager.username += f"(deleted-{now})"
        manager.email += f"(deleted-{now})"
        manager.save()
        return JsonResponse(
            data={"response": f"manager {manager.username} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )
