from django.core import mail
from django.utils import timezone
from django.conf import settings
from back.services.permits import PermitHandlingService

# from django.urls import reverse
# from datetime import datetime
from rest_framework.test import APITestCase
from back.models import (
    Project,
    Contractor,
    FoxUser,
    Company,
    ClientAdmin,
    ClientManager,
    Worker,
    Approval,
    Notification,
)
from back.services import ProjectEmailNotificationService


class ProjectStatusMailingTestCase(APITestCase):
    def setUp(self):
        company = Company.objects.create(name="Test company1")
        contractor = Contractor.objects.create(
            username="test1",
            password="password",
            email="lysak.ipr@gmail.com",
            role=Contractor.Role.contractor,
            related_company="Contr 1",
        )
        Project.objects.create(
            name="Test project1",
            description="Test description",
            company=company,
            contractor=contractor,
        )
        Project.objects.create(
            name="Test project2",
            description="Test description",
            company=company,
            contractor=contractor,
            # status="Rejected",
            end_date=timezone.localtime(),
        )
        Project.objects.create(
            name="Test project3",
            description="Test description",
            company=company,
            contractor=contractor,
            status="Started",
        )
        ClientAdmin.objects.create(
            username="test_admin1",
            password="ZAQ!XSW@",
            email="lysak1.ipr@gmail.com",
            role=FoxUser.Role.client_admin,
        )
        ClientManager.objects.create(
            username="test_man1",
            password="ZAQ!XSW@",
            email="lysak2.ipr@gmail.com",
            role=ClientManager.Role.client_manager,
            position=ClientManager.Position.safety_manager,
        )
        ClientManager.objects.create(
            username="test_man2",
            password="ZAQ!XSW@",
            email="lysak3.ipr@gmail2.com",
            role=ClientManager.Role.client_manager,
            position=ClientManager.Position.safety_manager,
        )
        Worker.objects.create(
            contractor=contractor,
            name="test_worker1",
            phone_number="000",
            birthday=timezone.localtime(),
            card_number_id="000",
            license_number="111",
            passport="222",
            safety_green_card="aaa",
            position_in_company="Weld",
            trade_competency="Civ",
        )
        Worker.objects.create(
            contractor=contractor,
            name="test_worker2",
            phone_number="000",
            birthday=timezone.localtime(),
            card_number_id="000",
            license_number="111",
            passport="222",
            safety_green_card="aaa",
            position_in_company="Weld",
            trade_competency="Civ",
        )

    def test_project_created_mail(self):
        project = Project.objects.get(name="Test project1")
        contractor = Contractor.objects.get(username="test1")
        email_service = ProjectEmailNotificationService(
            project=project, receivers=[contractor]
        )
        email_service.send_project_created()
        self.assertEqual(
            mail.outbox[-1].subject, "Project Test project1 has been assigned to you."
        )

    def test_project_rejected(self):
        project = Project.objects.get(name="Test project2")
        # contractor = Contractor.objects.get(username="test1")
        manager = ClientManager.objects.get(username="test_man1")
        email_service = ProjectEmailNotificationService(
            project=project, receivers=[project.contractor], issuer=manager
        )
        email_service.send_project_rejected()
        self.assertEqual(
            mail.outbox[-1].subject, "Project Test project2. Application rejected."
        )

    def test_project_approved(self):
        project = Project.objects.get(name="Test project2")
        manager = ClientManager.objects.get(username="test_man1")
        worker1 = Worker.objects.get(pk=1)
        worker2 = Worker.objects.get(pk=2)
        project.workers.add(worker1, worker2)
        PermitHandlingService(project).generate_permits()
        email_service = ProjectEmailNotificationService(
            project=project, receivers=[project.contractor], issuer=manager
        )
        email_service.send_project_approved()
        self.assertEqual(
            mail.outbox[-1].subject, "Your application has been approved."
        )

    def test_project_submitted(self):
        project = Project.objects.first()
        managers = ClientManager.objects.all()

        for manager in managers:
            Approval.objects.create(manager=manager, project=project)

        for manager in managers:
            email_service = ProjectEmailNotificationService(
                project=project, receivers=[manager], issuer=project.contractor
            )
            email_service.send_proposal_submitted()
        notifications = Notification.objects.all()
        self.assertEqual(
            mail.outbox[-1].subject, "Project Test project1 needs your approval."
        )
        self.assertEqual(notifications.count(), 2)
        self.assertEqual(
            notifications.first().message.forward_link,
            f"{settings.EMAIL_BASE_LINK}approvals/1",
        )
        self.assertEqual(
            notifications.all()[1].message.forward_link,
            f"{settings.EMAIL_BASE_LINK}approvals/2",
        )
