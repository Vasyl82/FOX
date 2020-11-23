from django.http import JsonResponse
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.views import APIView
from rest_framework import status
from back.models import Project, Approval, ClientManager, Activity
from back.logger import log
from back.services import ProjectEmailNotificationService as mail_service


class ProposalSubmit(APIView):
    def patch(self, request, pk, format=None):
        # get current project
        project = get_object_or_404(Project, pk=pk)

        # get companies managers
        managers = get_list_or_404(
            ClientManager, company=project.company, deleted=False
        )

        # create approval for each manager
        for manager in managers:
            log(
                log.DEBUG,
                "Assigned approval for project %d to manager %d",
                project.pk,
                manager.pk,
            )
            Approval.objects.create(manager=manager, project=project)

        # update current project status
        project.status = Project.Status.submitted
        project.save()

        # generate activity in activity log
        activity = Activity(
            project=project, author=request.user, company=request.user.company
        )
        activity.proposal_submition_message()

        # send emails
        for manager in managers:
            mail = mail_service(
                project=project,
                receivers=[manager],
                issuer=project.contractor,
            )
            mail.send_proposal_submitted()

        # return response
        return JsonResponse(
            {"success": "Application has been submitted"},
            status=status.HTTP_201_CREATED,
        )
