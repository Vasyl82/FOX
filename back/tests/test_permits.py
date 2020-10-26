from django.utils import timezone
from rest_framework.test import APITestCase
from back.models import (
    Contractor,
    FoxUser,
    Company,
    ClientAdmin,
    Project,
    Worker,
    Permit,
)
from back.services.permits import PermitHandlingService


class PermitHandlingTestCase(APITestCase):
    def setUp(self):
        company = Company.objects.create(name="Test company1")
        contractor = Contractor.objects.create(
            username="test1",
            password="password",
            email="lysak.ipr@gmail.com",
            role=Contractor.Role.contractor,
            related_company="Contr 1",
        )
        project = Project.objects.create(
            name="Test project1",
            description="Test description",
            company=company,
            contractor=contractor,
            end_date=timezone.localtime(),
        )
        ClientAdmin.objects.create(
            username="test_admin1",
            password="ZAQ!XSW@",
            email="lysak1.ipr@gmail.com",
            role=FoxUser.Role.client_admin,
        )
        worker1 = Worker.objects.create(
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
        worker2 = Worker.objects.create(
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
        project.workers.add(worker1, worker2)

    def test_generate_permits(self):
        project = Project.objects.get(name="Test project1")
        permit_service = PermitHandlingService(project)
        permit_service.generate_permits()
        permits = Permit.objects.filter(project__name="Test project1")
        self.assertEqual(permits.count(), 2)
        self.assertEqual(permits[0].worker.name, "test_worker1")

    def test_retreive_qr_codes(self):
        project = Project.objects.get(name="Test project1")
        permit_service = PermitHandlingService(project)
        permit_service.generate_permits()
        qr_codes = permit_service.retreive_qr_codes()
        self.assertEqual(len(qr_codes), 2)
        self.assertEqual(qr_codes[0]["filename"], "test_worker1_Test_project1.png")

    def test_verify_permit(self):
        pass
