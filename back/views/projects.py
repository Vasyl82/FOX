from back.models import Project
from back.serializers import ProjectSerializer, ProjectListSerializer
from rest_framework import generics


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "Contr":
            return Project.objects.filter(company=user.company, contractor=user)
        return Project.objects.filter(company=user.company)


class ProjectCreate(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(company=user.company)