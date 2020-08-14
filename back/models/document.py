from django.db import models


class Document(models.Model):
    template = models.ForeignKey("back.Template", on_delete=models.CASCADE, name='template')
    worker = models.ForeignKey("Worker", on_delete=models.CASCADE, name='Worker')
    managers = models.ManyToManyField(
        "ClientManager",
        through="DocumentAssign",
        through_fields=("document", "manager"),
    )
    # reg_number

    def __str__(self):
        return f'{self.template}'