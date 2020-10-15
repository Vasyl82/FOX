from django.db import models


def project_docs_path(instance, filename):
    return "project_{0}/{1}".format(instance.project.id, filename)


class Document(models.Model):

    name = models.CharField(max_length=128, null=True)
    file = models.FileField(upload_to=project_docs_path, null=True, blank=True)
    project = models.ForeignKey(
        "back.Project", on_delete=models.CASCADE, related_name="documents", null=True
    )
    template = models.ForeignKey(
        "back.Template", on_delete=models.SET_NULL, related_name="templates", null=True, blank=True
    )
    deleted = models.BooleanField(default=False)
    url_to_doc = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"
