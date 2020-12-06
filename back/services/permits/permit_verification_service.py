import jwt
from django.utils import timezone
from django.conf import settings
from back.models import Permit


class PermitVerificationService:
    def __init__(self, part1, part2, part3):
        self.token = ".".join((part1, part2, part3))

    def verify_permit(self):
        payload = jwt.decode(
            self.token, key=settings.PERMIT_VALIDATE_KEY.encode(), algorithm="HS256"
        )
        permit = Permit.objects.get(pk=payload.get("id"))
        permit_is_valid = self._validate_permit(permit)
        if permit_is_valid:
            return {"name": permit.worker.name}
        return "You do not have the permission to Scan the QR Code"

    def _validate_permit(self, permit):
        if permit is None:
            return False
        end_date = (
            permit.project.extend_date
            if permit.project.extend_date is not None
            else permit.project.end_date
        )
        return permit.active and (timezone.localtime() < end_date)
