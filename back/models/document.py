from django.db import models
from django.utils.translation import gettext_lazy as _


def project_docs_path(instance, filename):
    return "project_{0}/{1}".format(instance.project.id, filename)


def project_filled_files_path(instance, filename):
    return "project_{0}/filled/{1}".format(instance.project.id, filename)


class Document(models.Model):
    class HazardousWork(models.TextChoices):
        none = "None", _("None")
        work_at_height = "Work_At_Height", _("Work At Height")
        lifting_work = "Lifting_Work", _("Lifting Work")
        confined_space = "Confined_Space", _("Confined Space")
        hot_work = "Hot_Work", _("Hot Work")
        chemical_handling = "Chemical_Handling", _("Chemical Handling")
        work_alone = "Work_Alone", _("Work Alone")
        work_at_sensitive_area = "Work_At_Sensitive_Area", _("Work At Sensitive Area")
        cold_work = "Cold_Work", _("Cold Work")

    name = models.CharField(max_length=128, null=True)
    file = models.FileField(upload_to=project_docs_path, null=True, blank=True)
    filled_file = models.FileField(upload_to=project_filled_files_path, null=True, blank=True)
    project = models.ForeignKey(
        "back.Project", on_delete=models.CASCADE, related_name="documents", null=True
    )
    hazardous_work = models.CharField(
        max_length=25, choices=HazardousWork.choices, default=HazardousWork.none
    )
    template = models.ForeignKey(
        "back.Template",
        on_delete=models.SET_NULL,
        related_name="templates",
        null=True,
        blank=True,
    )
    deleted = models.BooleanField(default=False)
    url_to_doc = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"
