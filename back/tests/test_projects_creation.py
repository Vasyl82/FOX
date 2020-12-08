from rest_framework.test import APITestCase, APIRequestFactory
from django.core.files.uploadedfile import SimpleUploadedFile

from back.models import ClientAdmin, Company, FoxUser, Contractor, Project, Document
# , FoxUser, Project, Document
from back.views import ProjectCreate
from .auth_utils import get_jwt_token

USERNAME = "test1"
PASSWORD = "test_password_12345"


class ProjectWithDocsCreateTestCase(APITestCase):
    def setUp(self):
        Company.objects.create(name="Dana company")
        ClientAdmin.objects.create_user(
            username=USERNAME,
            password=PASSWORD,
            email="lysak.ipr@gmail.com",
            role=FoxUser.Role.client_admin,
        )
        Contractor.objects.create(
            username="contr1",
            password="contrpassword",
            email="romaniuk.dana.education@gmail.com",
            role=Contractor.Role.contractor,
            related_company="Dana company",
        )
        self.factory = APIRequestFactory()
        self.mock_file_1 = SimpleUploadedFile('file_1.docx', b'This is file 1')
        self.mock_file_2 = SimpleUploadedFile('file_2.docx', b'This is file 2')

    def test_docs(self):
        company = Company.objects.get(name="Dana company")
        contractor = Contractor.objects.get(username="contr1")
        token = get_jwt_token(
            self.factory, {"username": USERNAME, "password": PASSWORD}
        )
        request = self.factory.post(
            "/api/projects/new/",
            # {"username": USERNAME, "password": PASSWORD},
            {
                "name": "my project",
                "description": "My test description",
                "company": company,
                "contractor": contractor,
                "status": "Started",
                "documents": [
                    {
                        "name": "test1",
                        "file": self.mock_file_1
                    },
                    {
                        "name": "test2",
                        "file": self.mock_file_2
                    }
                ]
            }


        )
        request.headers = {"Autorization": f"JWT {token}"}
        response = ProjectCreate.as_view()(request)

        self.assertEqual(response.status_code, 200)
        # self.assertEqual(response.data["company"][0].name, "Dana company")
        # self.assertEqual(response.data["documents"][0].name, "file_1.docx")
