from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend

from back.models import Activity
from back.serializers import ActivityListSerializer


class ActivityList(ListAPIView):
    serializer_class = ActivityListSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["project_id"]

    def get_queryset(self):
        user = self.request.user
        if user.role == "Contr":
            return Activity.objects.filter(company=user.company).order_by("-pk")
        return Activity.objects.filter(company=user.company).order_by("-pk")
