import pyqrcode
import jwt
from django.conf import settings


class QrCodeService:
    def __init__(self, permit):
        self.permit = permit

    @property
    def token(self):
        payload = {
            "id": self.permit.pk,
        }
        return jwt.encode(
            payload=payload,
            key=settings.PERMIT_VALIDATE_KEY.encode(),
            algorithm="HS256",
        )

    @property
    def url(self):
        token_parts = self.token.decode("utf-8").split(".")
        token_parts.insert(0, f"{settings.EMAIL_BASE_LINK}permits/validate")
        return "/".join(token_parts)

    @property
    def qr_code(self):
        worker_name = self._format_name(self.permit.worker.name)
        project_name = self._format_name(self.permit.project.name)
        filename = f"{worker_name}_{project_name}.png"
        qr_code = pyqrcode.create(self.url, error="M")
        return {"qr_code_obj": qr_code, "filename": filename}

    def _format_name(self, name):
        return name.replace(" ", "_")
