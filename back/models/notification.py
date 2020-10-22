from django.db import models
from django.utils import timezone


class Notification(models.Model):
    message = models.ForeignKey(
        to="Message", on_delete=models.CASCADE, related_name="notifications"
    )
    receiver = models.ForeignKey(
        to="FoxUser", on_delete=models.CASCADE, related_name="notifications"
    )
    emitted = models.DateTimeField(default=timezone.localtime)
    unread = models.BooleanField(default=True)

    def __str__(self):
        return f"[{self.emitted}] {self.message.text}. Unread: {self.unread}"
