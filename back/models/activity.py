from django.db import models
from django.utils import timezone


class Activity(models.Model):
    message = models.TextField(null=True)
    timestamp = models.DateTimeField(default=timezone.localtime())
    project = models.ForeignKey(
        "Project", on_delete=models.SET_NULL, related_name="activities", null=True
    )
    author = models.ForeignKey(
        "FoxUser", on_delete=models.SET_NULL, related_name="activities", null=True
    )
    company = models.ForeignKey(
        "Company", on_delete=models.SET_NULL, related_name="activities", null=True
    )

    def __str__(self):
        return f"{self.message}"

    def project_created_message(self):
        self.message = "[{0}] Project created by admin {1}.".format(
            timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
            self.author.username,
        )
        self.save()

    def proposal_submition_message(self):
        self.message = "[{0}] Submitted proposal by contractor {1}.".format(
            timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
            self.author.contractor.related_company,
        )
        self.save()

    def project_status_updated_message(self, status):
        self.message = "[{0}] Project status updated to '{1}' by admin {2}.".format(
            timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
            status,
            self.author.username,
        )
        self.save()

    def approval_result_message(self, status, comment):
        message = (
            "[{0}] Submition {1} by {2} {3}. Comment: {4}".format(
                timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
                status.lower(),
                self.author.clientmanager.Position(
                    self.author.clientmanager.position
                ).label,
                self.author.username,
                comment,
            )
            if comment
            else "[{0}] Submition {1} by {2} {3}.".format(
                timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
                status.lower(),
                self.author.clientmanager.Position(
                    self.author.clientmanager.position
                ).label,
                self.author.username,
            )
        )
        self.message = message
        self.save()

    def project_submition_accepted_message(self):
        self.message = "[{0}] All managers approved the proposal.".format(
            timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
        )
        self.save()

    def project_submition_rejected_message(self):
        self.message = "[{0}] The project proposal has been rejected and sent to resubmition.".format(
            timezone.localtime().strftime("%m/%d/%Y, %H:%M"),
        )
        self.save()
