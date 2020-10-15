from django.db import models
from django.utils.translation import gettext_lazy as _


def project_docs_path(instance, filename):
    return "company_{0}/{1}".format(instance.company.id, filename)


class Template(models.Model):
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

    name = models.CharField(max_length=128)

    company = models.ForeignKey(
        to="Company", on_delete=models.CASCADE, related_name="templates", null=True
    )
    hazardous_work = models.CharField(
        max_length=25, choices=HazardousWork.choices, default=HazardousWork.none
    )
    file = models.FileField(upload_to=project_docs_path, null=False, blank=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"
