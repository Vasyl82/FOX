# from rest_framework import generics
from rest_framework import permissions, status, authentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_jwt.views import ObtainJSONWebToken
from back.serializers import (
    UserSerializer,
    UserSerializerWithToken,
    FoxJSONWebTokenSerializer,
)
from back.models import Company


FoxUser = get_user_model()


@api_view(["GET"])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class ObtainFoxJWTToken(ObtainJSONWebToken):
    def pre_save(self, obj):
        obj.company = Company()

    serializer_class = FoxJSONWebTokenSerializer


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all FoxUser objects.
    """

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        serializer = UserSerializerWithToken(FoxUser.objects.get(pk=1))
        return Response(serializer.data, status=status.HTTP_200_OK)
