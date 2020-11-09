from rest_framework.test import APITestCase, APIRequestFactory
from back.views import ObtainFoxJWTToken

# from django.test import TestCase
from back.models import Contractor, FoxUser
from .auth_utils import get_jwt_token


USERNAME = "test1"
PASSWORD = "test_password_12345"


class ActivityTestCase(APITestCase):
    def setUp(self):
        Contractor.objects.create_user(
            username=USERNAME,
            password=PASSWORD,
            email="lysak.ipr@gmail.com",
            role=Contractor.Role.contractor,
            related_company="Contr 1",
        )
        self.factory = APIRequestFactory()

    def test_login(self):
        contractor = FoxUser.objects.get(username=USERNAME)
        self.assertEqual(contractor.username, USERNAME)
        request = self.factory.post(
            "/api/token-auth/",
            {"username": USERNAME, "password": PASSWORD},
        )
        response = ObtainFoxJWTToken.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_false_login(self):
        request = self.factory.post(
            "/api/token-auth/",
            {"username": "wrong_username", "password": "wrong password"},
        )
        response = ObtainFoxJWTToken.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_token_util(self):
        token = get_jwt_token(
            self.factory, {"username": USERNAME, "password": PASSWORD}
        )
        self.assertIsNotNone(token)
