from rest_framework.test import APITestCase
from back.models import Template,  Document, Project, Company
from back.services.predifined_doc_handling_service import PredefinedDocHandlingService
from django.core.files.uploadedfile import SimpleUploadedFile


class TestPredefinedDocHandlingService(APITestCase):
    def setUp(self):
        mock_file = SimpleUploadedFile('best_file_eva.txt', b'these are the contents of the txt file')
        company = Company.objects.create(name="Test company1")
        Project.objects.create(
            name="Test project1",
            description="Test description",
            company=company,
            work_at_height=True
        )
        Template.objects.create(
            company=company,
            name="template1",
            hazardous_work=Template.HazardousWork.work_at_height,
            file=mock_file
        )

    def test_predefined_doc_create(self):
        project = Project.objects.first()
        template = Template.objects.first()
        service = PredefinedDocHandlingService(project=project)
        service.create_documents()
        document = Document.objects.first()
        self.assertEqual(document.project, project)
        self.assertEqual(document.template, template)
        self.assertEqual(
            document.file.open().read(), b"these are the contents of the txt file"
        )
