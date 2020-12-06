from django.db.models import F
from django.utils import timezone
from rest_framework import serializers
from back.models import Project, ClientManager, Approval, Worker
# from back.serializers import DocumentSerializer


class ProjectListSerializer(serializers.ModelSerializer):

    project_name = serializers.SerializerMethodField()
    application_status = serializers.SerializerMethodField()
    project_status = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()
    extend_date = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "project_name",
            "start_date",
            "end_date",
            "contractor_name",
            "location",
            "status",
            "application_status",
            "project_status",
            "extend_date",
        ]

    def get_application_status(self, obj):
        status = obj.status
        status_options = {
            "Created": "Created",
            "Submitted": "Submitted",
            "Approved": "Approved",
            "Rejected": "Rejected",
            "Closed": "Closed",
        }
        application_status = (
            status_options[status] if status in status_options.keys() else "Approved"
        )
        return application_status

    def get_project_status(self, obj):
        status = obj.status
        status_options = {
            "Approved": "Ready to start",
            "Started": "Started",
            "Completed": "Completed",
            "Extended": "Extended",
            "Closed": "Closed",
        }
        project_status = (
            status_options[status]
            if status in status_options.keys()
            else "Application processing"
        )
        return project_status

    def get_start_date(self, obj):
        return obj.start_date.strftime("%d %b %Y")

    def get_end_date(self, obj):
        return obj.end_date.strftime("%d %b %Y")

    def get_extend_date(self, obj):
        return (
            obj.extend_date.strftime("%d %b %Y") if obj.extend_date is not None else ""
        )

    def get_project_name(self, obj):
        return obj.name


class ProjectSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")
    end_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")
    applicant_name = serializers.SerializerMethodField()
    applicant_phone = serializers.SerializerMethodField()
    creation_date = serializers.SerializerMethodField()
    extend_date = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M:%S", required=False, allow_null=True
    )
    submit_date = serializers.DateTimeField(
        format="%Y-%m-%dT%H:%M:%S", required=False, allow_null=True
    )
    contractor_name = serializers.CharField(
        source="contractor.username", read_only=True
    )
    organization = serializers.CharField(
        source="contractor.related_company", read_only=True
    )
    reference_id = serializers.SerializerMethodField()

    issued_by = serializers.SerializerMethodField()

    approved_by = serializers.SerializerMethodField()

    submitted_by = serializers.SerializerMethodField()

    # documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"

    def get_reference_id(self, obj):
        return (
            f"PTW/{obj.company.pk}/{obj.contractor.pk}/{obj.start_date.year}/{obj.pk}"
        )

    def get_creation_date(self, obj):
        return {
            "date": timezone.localtime(value=obj.creation_date).strftime("%d %b %Y"),
            "time": timezone.localtime(value=obj.creation_date).strftime("%H:%M:%S"),
        }

    def get_applicant_name(self, obj):
        if obj.applicant_name:
            return obj.applicant_name
        elif obj.responsible_person:
            return obj.responsible_person.name
        return "No person in charge yet"

    def get_applicant_phone(self, obj):
        if obj.applicant_phone:
            return obj.applicant_phone
        elif obj.responsible_person:
            return obj.responsible_person.phone_number
        return "No person in charge yet"

    def get_issued_by(self, obj):
        return {
            "name": obj.company.fox_users.filter(role="CliAdm").first().name,
            "email": obj.company.fox_users.filter(role="CliAdm").first().email
            }

    def get_approved_by(self, obj):
        managers = ClientManager.objects.filter(company=obj.company)
        last_approvals = []
        for manager in managers:
            last_approve = (
                manager.approvals.filter(project=obj).order_by(F("pk").desc()).first()
            )
            last_approvals += [last_approve]
        last_approvals = [a for a in last_approvals if a is not None]
        return [
            {
                "name": approval.manager.name,
                "position": approval.manager.Position(approval.manager.position).label,
                "last_resolved_date": approval.last_resolved.strftime("%d %b %Y"),
                "last_resolved_time": approval.last_resolved.strftime("%H:%M:%S"),
                "email": approval.manager.email.split("(deleted-")
            }
            for approval in last_approvals
            if approval.status == Approval.Status.approved
        ]

    def get_submitted_by(self, obj):
        if obj.responsible_person:
            return {
                "name": obj.company.fox_users.filter(role="Contr").first().name,
                "email": obj.company.fox_users.filter(role="Contr").first().email.split('(deleted-'),
                "submitted_date": obj.submit_date.strftime("%d %b %Y"),
                "submitted_time": obj.submit_date.strftime("%H:%M:%S"),
            }
        elif obj.applicant_name:
            """DO NOT DELETE, SERVER DEPRICATED FEATURES"""
            return {
                "name": obj.applicant_name,
                "position":  obj.applicant_name,
                "submitted_date": obj.submit_date.strftime("%d %b %Y") if obj.submit_date else "",
                "submitted_time": obj.submit_date.strftime("%H:%M:%S") if obj.submit_date else "",
                "phone": obj.applicant_phone
            }
        else:
            return None
