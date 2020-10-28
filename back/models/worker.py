from django.db import models
from django.utils.translation import gettext_lazy as _


def project_docs_path(instance, filename):
    return "contractors/contractor_{0}/workers/{1}".format(
        instance.contractor.id, filename
    )


class Worker(models.Model):
    class Position(models.TextChoices):
        welder = "Weld", _("Welder")
        fitter = "Fit", _("Fitter")
        helper = "Help", _("Helper")
        rigger = "Rig", _("Rigger")
        safety_officer = "SafeOff", _("Safety Officer")
        plumber = "Plumb", _("Plumber")
        technician = "Tech", _("Technician")
        electrician = "Electr", _("Electrician")
        flooring_installer = "FlrInst", _("Flooring Installer")
        hvac_installer = "HVACInst", _("HVAC Installer")
        insulation_installer = "InsInst", _("Insulation Installer")
        surveyor = "Surv", _("Surveyor")
        brick_manson = "BrcMans", _("Brick Manson")
        roofer = "Roof", _("Roofer")
        site_supervisor = "SiteSuper", _("Site Supervisor")
        other = "Other", _("Other")

    class TradeCompetency(models.TextChoices):
        civil = "Civ", _("Civil")
        electrical = "Electr", _("Electrical")
        mechanical = "Mech", _("Mechanical")
        infra = "Infra", _("Infra")
        general = "Gen", _("General")
        safety = "Safe", _("Safety")
        security = "Secur", _("Security")

    name = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=64, null=True)
    contractor = models.ForeignKey(
        "Contractor", on_delete=models.CASCADE, related_name="workers"
    )
    birthday = models.DateField()
    card_number_id = models.CharField(max_length=64, null=True, blank=True)
    card_number_id_scan = models.FileField(upload_to=project_docs_path, null=True, blank=True)
    license_number = models.CharField(max_length=64)
    license_scan = models.FileField(upload_to=project_docs_path, null=True, blank=True)
    passport = models.CharField(max_length=64, null=True, blank=True)
    passport_scan = models.FileField(upload_to=project_docs_path, null=True, blank=True)
    safety_green_card = models.CharField(max_length=64)
    safety_green_card_scan = models.FileField(
        upload_to=project_docs_path, null=True, blank=True
    )
    position_in_company = models.CharField(
        max_length=16, choices=Position.choices, default=Position.other
    )
    trade_competency = models.CharField(
        max_length=16, choices=TradeCompetency.choices, default=TradeCompetency.general
    )
    safety_quiz_answer = models.FileField(
        upload_to=project_docs_path, null=True, blank=True
    )
    personal_declaration = models.FileField(
        upload_to=project_docs_path, null=True, blank=True
    )
    deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Worker"

    def __str__(self):
        return f"{self.name}"
