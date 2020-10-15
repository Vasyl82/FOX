from back.models import Permit
from back.services.qr_code_service import QrCodeService


class PermitHandlingService:
    def __init__(self, project):
        self.project = project

    def generate_permits(self):
        for worker in self.project.workers.all():
            permit = Permit(project=self.project, worker=worker)
            permit.save()

    def retreive_qr_codes(self):
        permits = Permit.objects.filter(project__pk=self.project.pk)
        codes = [QrCodeService(permit).qr_code for permit in permits]
        return codes
