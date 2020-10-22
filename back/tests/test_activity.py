from django.urls import reverse
from rest_framework.test import APITestCase
from django.utils import timezone

# from django.test import TestCase
from back.models import (
    Project,
    Contractor,
    FoxUser,
    Company,
    Activity,
    ClientAdmin,
    ClientManager,
    Approval,
)


class ActivityTestCase(APITestCase):
    def setUp(self):
        Project.objects.create(
            name="Test project1",
            description="Test description",
        )
        Contractor.objects.create(
            username="test1",
            password="password",
            email="lysak.ipr@gmail.com",
            role=Contractor.Role.contractor,
            related_company="Contr 1",
        )
        ClientAdmin.objects.create(
            username="test_admin1",
            password="ZAQ!XSW@",
            email="lysak.ipr@gmail.com",
            role=FoxUser.Role.client_admin,
        )
        ClientManager.objects.create(
            username="test_man1",
            password="ZAQ!XSW@",
            email="lysak.ipr@gmail.com",
            role=ClientManager.Role.client_manager,
            position=ClientManager.Position.safety_manager,
        )

        Company.objects.create(name="Test company1")

    def test_activities_proposal_submition_message(self):
        project = Project.objects.get(name="Test project1")
        user = FoxUser.objects.get(username="test1")
        company = Company.objects.get(name="Test company1")
        activity = Activity(project=project, author=user, company=company)
        activity.proposal_submition_message()
        self.assertEqual(
            activity.message,
            f'[{timezone.localtime().strftime("%m/%d/%Y, %H:%M")}] Submitted proposal by contractor Contr 1.',
        )

    def test_activities_project_created_message(self):
        project = Project.objects.get(name="Test project1")
        user = FoxUser.objects.get(username="test_admin1")
        company = Company.objects.get(name="Test company1")
        activity = Activity(project=project, author=user, company=company)
        activity.project_created_message()
        self.assertEqual(
            activity.message,
            f'[{timezone.localtime().strftime("%m/%d/%Y, %H:%M")}] Project created by admin test_admin1.',
        )

    def test_activities_project_approved_message(self):
        pass

    def test_activities_project_rejected_message(self):
        pass

    def test_activities_works_status_update_message(self):
        pass

    def test_activities_approval_confirmed_message(self):
        project = Project.objects.get(name="Test project1")
        user = ClientManager.objects.get(username="test_man1")
        approval = Approval.objects.create(
            project=project, manager=user, status="Approved"
        )
        company = Company.objects.get(name="Test company1")
        activity = Activity(project=project, author=user, company=company)
        activity.approval_result_message(approval.status, approval.description)
        self.assertEqual(
            activity.message,
            f'[{timezone.localtime().strftime("%m/%d/%Y, %H:%M")}] Submition approved by Safety Manager test_man1.',
        )

    def test_activities_approval_rejected_message(self):
        project = Project.objects.get(name="Test project1")
        user = ClientManager.objects.get(username="test_man1")
        company = Company.objects.get(name="Test company1")
        approval = Approval.objects.create(
            project=project, manager=user, status="Rejected", description="No"
        )
        activity = Activity(project=project, author=user, company=company)
        activity.approval_result_message(approval.status, approval.description)
        self.assertEqual(
            activity.message,
            "[{0}] Submition rejected by Safety Manager test_man1. Comment: No".format(
                timezone.localtime().strftime("%m/%d/%Y, %H:%M")
            ),
        )

    def test_project_creation_activity(self):
        url = reverse("project-create")
        data = {
            "name": "Test project1",
            "description": "Test description",
        }
        response = self.client.post(url, data)
        self.assertIsNotNone(response)

    def login(self, data):
        url = reverse("login")
        response = self.client.post(url, data)
        return response
