from django.db import models


def project_qr_code_path(instance, filename):
    return "project_{0}/permits/worker_{1}/{2}".format(
        instance.project.id, instance.worker.id, filename
    )


class Permit(models.Model):
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="permits"
    )
    worker = models.ForeignKey(
        "Worker", on_delete=models.CASCADE, related_name="permits"
    )
    issue_date = models.DateField(auto_now_add=True)
    # end_date = models.DateTimeField()
    active = models.BooleanField(default=True)
    qr_code = models.ImageField(upload_to=project_qr_code_path, null=True, blank=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"Permit for {self.worker} ({self.project})"
