from django.db import models
from django.contrib.auth.models import User


class Follower(models.Model):
    """
    Follower model.  Each instance represents a 'follow'.
    The 'owner' field represents the User doing the following.
    The 'followed' field represents the User that is being followed.
    Definining a 'related_name' to each field ensures that Django
    can differentiate between the two, as they are both instances
    of the User model.
    To ensure that a User can only follow another User once,
    'unique_together' is defined in the Meta class.
    """

    owner = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE
    )
    followed = models.ForeignKey(
        User, related_name="followed", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ["owner", "followed"]

    def __str__(self):
        return f"{self.owner} {self.followed}"
