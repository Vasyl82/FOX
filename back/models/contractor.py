from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from back.signals.mailing_signals import send_mail_on_creation
from django.contrib.auth import get_user_model

FoxUser = get_user_model()


def signature_img_path(instance, filename):
    return "contractor_{0}/{1}".format(instance.id, filename)


class Contractor(FoxUser):
    class Type(models.TextChoices):
        default = "Default", _("Contractor")

    contractor_type = models.CharField(
        max_length=10,
        choices=Type.choices,
        default=Type.default,
    )

    related_company = models.CharField(max_length=128, null=True)
    company_phone = models.CharField(max_length=64, null=True)
    companies = models.ManyToManyField(
        "Company", related_name="contractors", blank=True
    )
    signature = models.ImageField(upload_to=signature_img_path, null=True, blank=True)

    class Meta:
        verbose_name = "Contractor"

    def __str__(self):
        return f"{self.username}"

    def __repr__(self):
        return self.__str__()

    @property
    def project_list(self):
        return [project.name for project in self.projects.all()]

    @property
    def info(self):
        return {"contractor_name": self.related_company}


post_save.connect(send_mail_on_creation, sender=Contractor)
