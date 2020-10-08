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
        permit_is_valid = timezone.now() < permit.end_date
        if permit and permit.active and permit_is_valid:
            return {"name": permit.worker.name}
        return "Access Denied"
