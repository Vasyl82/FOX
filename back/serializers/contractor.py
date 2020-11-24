from rest_framework import serializers
from back.models import Contractor

# , FoxUser


class ContractorListSerializer(serializers.ModelSerializer):

    contact_person = serializers.SerializerMethodField()
    # company_or_organization = serializers.CharField(source="related_company")

    class Meta:
        model = Contractor
        fields = [
            "id",
            "username",
            "related_company",
            "contact_person",
            "company_phone",
        ]

    def get_contact_person(self, obj):
        return obj.name


class ContractorSerializer(serializers.ModelSerializer):

    default = ""

    class Meta:
        model = Contractor
        fields = [
            "id",
            "username",
            "name",
            "email",
            "company_phone",
            "role",
            "related_company",
            "company",
        ]
