from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from back.models import Template
from back.serializers import TemplateSerializer, TemplateListSerializer


class TemplateCreateView(generics.CreateAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


class TemplateListView(generics.ListAPIView):
    serializer_class = TemplateListSerializer

    def get_queryset(self):
        user = self.request.user
        return Template.objects.filter(company=user.company, deleted=False)


class SingleTemplateView(RetrieveUpdateDestroyAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
