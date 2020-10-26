from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class FoxUser(AbstractUser):
    class Role(models.TextChoices):
        client_manager = "CliMan", _("Client Manager")
        client_admin = "CliAdm", _("Client Admin")
        contractor = "Contr", _("Contractor")
        dummy = "Dum", _("Dummy")

    company = models.ForeignKey(
        "Company", on_delete=models.CASCADE, null=True, related_name="fox_users"
    )
    role = models.CharField(
        max_length=16,
        choices=Role.choices,
        default=Role.dummy,
    )
    name = models.CharField(max_length=128, default="BarFoo")
    email = models.EmailField(_("email address"), blank=False, unique=True)
    deleted = models.BooleanField(default=False)
    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    @property
    def info(self):
        return {"company_name": self.company, "role": self.role}
