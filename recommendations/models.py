from django.db import models
from django.contrib.auth.models import User
from snapshots.models import Snapshot


class Recommendation(models.Model):
    """
    Recommendation model.  There is a 'One To Many' relationship
    with the User and Snapshot models.  Many recommendations can
    belong to a single User or a single Snapshot.
    'unique together' is included in the meta class to ensure
    that the user cannot recommend a snapshot more than once.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    snapshot = models.ForeignKey(
        Snapshot, related_name="recommendations", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ["owner", "snapshot"]

    def __str__(self):
        return f"{self.owner} {self.snapshot}"
