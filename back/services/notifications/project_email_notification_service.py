import tempfile
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from back.logger import log
from .internal_notification_service import (
    InternalNotificationService as internal_service,
)
from back.services.permits import PermitHandlingService
from back.models import Approval


class ProjectEmailNotificationService:
    def __init__(self, receivers, project, issuer=None):
        self.receivers = receivers
        self.mail_list = [receiver.email for receiver in receivers]
        self.project = project
        self.subject = None
        self.context = {}
        self.email_text = {}
        self.issuer = issuer
        self.link = f"{settings.EMAIL_BASE_LINK}projects/{self.project.pk}"

    def send_project_updated(self):
        try:
            METHOD_NAME = self.project.status.lower()
            getattr(self, f"send_project_{METHOD_NAME}")()
        except AttributeError:
            log(
                log.WARNING,
                "Project [%s] status changed to [%s] with no email",
                self.project.name,
                self.project.status,
            )

    def send_project_created(self):
        self.subject = f"Project {self.project.name} has been assigned to you."
        self._conduct_email_send("project_created")
        self._conduct_internal_notification()

    def send_proposal_submitted(self):
        self.subject = f"Project {self.project.name} needs your approval."
        self._update_link_to_approval()
        self._conduct_email_send("proposal_submitted")
        self._conduct_internal_notification()

    def send_project_approved(self):
        self.subject = "Your application has been approved."
        self._conduct_email_send_with_qr_codes("project_approved")
        self._conduct_internal_notification()

    def send_project_rejected(self):
        self.subject = f"Project {self.project.name}. Application rejected."
        self._conduct_email_send("project_rejected")
        self._conduct_internal_notification()

    def send_project_extended(self):
        self.subject = "Your Project has been extended."
        self._conduct_email_send("project_extended")
        self._conduct_internal_notification()

    def send_project_closed(self):
        self.subject = "Your project has been closed."
        self._conduct_email_send("project_closed")
        self._conduct_internal_notification()

    def _conduct_email_send(self, template):
        self._generate_context()
        self._render_email_text(template)
        self._send_message()

    def _conduct_email_send_with_qr_codes(self, template):
        self._generate_context()
        self._render_email_text(template)
        self._send_message_with_qr_codes()

    def _conduct_internal_notification(self):
        internal_message = internal_service(
            message_text=self.subject, receivers=self.receivers, forward_link=self.link
        )
        internal_message.emit()

    def _generate_context(self):
        self.context = {
            "redirect_link": self.link,
            "project_name": self.project.name,
            "company_name": self.project.company.name,
            "contractor_name": self.project.contractor,
            "username": self.receivers[0].name
        }
        if self.issuer:
            self.context = {**self.context, **self.issuer.info}

    def _update_link_to_approval(self):
        approval_pk = (
            Approval.objects.filter(project=self.project, manager=self.receivers[0])
            .last()
            .pk
        )
        self.link = f"{settings.EMAIL_BASE_LINK}approvals/{approval_pk}"

    def _render_email_text(self, template):
        self.email_text["html_message"] = render_to_string(
            f"email/{template}.html", self.context
        )
        self.email_text["plaintext_message"] = render_to_string(
            f"email/{template}.txt", self.context
        )

    def _send_message(self):

        msg = EmailMultiAlternatives(
            subject=self.subject,
            body=self.email_text["plaintext_message"],
            from_email=settings.EMAIL_EMAIL_FROM,
            to=self.mail_list,
        )
        msg.attach_alternative(self.email_text["html_message"], "text/html")
        msg.send()

    def _send_message_with_qr_codes(self):

        msg = EmailMultiAlternatives(
            subject=self.subject,
            body=self.email_text["plaintext_message"],
            from_email=settings.EMAIL_EMAIL_FROM,
            to=self.mail_list,
        )
        msg.attach_alternative(self.email_text["html_message"], "text/html")
        qr_codes = PermitHandlingService(self.project).retreive_qr_codes()
        for qr_code in qr_codes:
            with tempfile.TemporaryFile() as fp:
                qr_code["qr_code_obj"].png(fp, scale=5)
                fp.seek(0)
                image_data = fp.read()
                msg.attach(qr_code["filename"], image_data, "image/png")
        msg.send()
