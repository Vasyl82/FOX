from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    class Status(models.TextChoices):
        created = "Created", _("Created")
        submitted = "Submitted", _("Submitted")
        approved = "Approved", _("Approved")
        rejected = "Rejected", _("Rejected")
        works_started = "Works_started", _("Works started")
        works_finished = "Works_finished", _("Works finished")
        extended = "Extended", _("Extended")
        closed = "Closed", _("Closed")

    name = models.CharField(max_length=64)
    description = models.TextField()
    location = models.CharField(max_length=255, default="Whole facility")
    submit_date = models.DateTimeField(null=True, blank=True)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    extend_date = models.DateTimeField(null=True, blank=True)

    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.created
    )
    company = models.ForeignKey(
        to="Company", on_delete=models.CASCADE, related_name="projects", null=True
    )
    contractor = models.ForeignKey(
        to="Contractor", on_delete=models.SET_NULL, related_name="projects", null=True
    )
    workers = models.ManyToManyField("Worker", related_name="projects", blank=True)
    work_at_height = models.BooleanField(default=False)
    lifting_work = models.BooleanField(default=False)
    confined_space = models.BooleanField(default=False)
    hot_work = models.BooleanField(default=False)
    chemical_handling = models.BooleanField(default=False)
    work_alone = models.BooleanField(default=False)
    work_at_sensitive_area = models.BooleanField(default=False)
    cold_work = models.BooleanField(default=False)
    responsible_person = models.ForeignKey(
        "Worker",
        related_name="projects_to_manage",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    applicant_name = models.CharField(max_length=64, null=True, blank=True)
    applicant_phone = models.CharField(max_length=32, null=True, blank=True)
    deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Project"

    def __str__(self):
        return f"{self.name}"

    @property
    def company_name(self):
        return self.company.name

    @property
    def contractor_name(self):
        return self.contractor.username
