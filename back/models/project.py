from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField()
    start_date = models.DateField(null=True)
    start_time = models.TimeField(null=True)
    end_date = models.DateField(null=True)
    end_time = models.TimeField(null=True)
    company = models.ForeignKey(
        to="Company", on_delete=models.CASCADE, related_name="projects", null=True
    )
    contractor = models.ForeignKey(
        to="Contractor", on_delete=models.SET_NULL, related_name="projects", null=True
    )
    # templates = models.ManyToManyField(to="Template", related_name="projects")

    class Meta:
        verbose_name = "Project"

    def __str__(self):
        return f"{self.name}"

    @property
    def company_name(self):
        return self.company.name

    @property
    def contractor_name(self):
        # return ",".join([c.username for c in self.contractors])
        return self.contractor.username
