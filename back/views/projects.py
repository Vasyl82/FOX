from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from back.models import Project, Activity
from back.serializers import ProjectSerializer, ProjectListSerializer
from back.services import (
    ProjectEmailNotificationService as mail_service,
    PredefinedDocHandlingService,
)


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "Contr":
            return Project.objects.filter(
                # company=user.company,
                contractor=user,
                deleted=False,
            )
        return Project.objects.filter(company=user.company, deleted=False)


class ProjectCreate(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def create(self, request, *args, **kwargs):
        res = super(ProjectCreate, self).create(request, args, kwargs)
        project = Project.objects.get(pk=res.data["id"])
        activity = Activity(
            project=project, author=request.user, company=project.company
        )
        activity.project_created_message()
        email = mail_service(project=project, receivers=[project.contractor])
        email.send_project_created()

        PredefinedDocHandlingService(project=project).create_documents()

        return res


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "Contr":
            return Project.objects.filter(contractor__pk=user.pk, deleted=False)
        return Project.objects.filter(company=user.company, deleted=False)

    def patch(self, request, *args, **kwargs):

        if kwargs["pk"]:
            prev_project = Project.objects.get(pk=kwargs["pk"])

        res = super(ProjectDetail, self).patch(request, args, kwargs)
        project = Project.objects.get(pk=res.data["id"])
        if prev_project.status != project.status:
            activity = Activity(
                project=project, author=request.user, company=project.company
            )
            activity.project_status_updated_message(project.status)
            mail = mail_service(project=project, receivers=[project.contractor])
            mail.send_project_updated()
            if project.status == "Closed":
                project.permits.update(active=False)
        return res

    def destroy(self, request, pk):
        queryset = self.get_queryset()
        project = get_object_or_404(queryset, pk=pk)
        project.deleted = True
        project.save()
        return JsonResponse(
            data={"response": f"project {project.name} deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )
