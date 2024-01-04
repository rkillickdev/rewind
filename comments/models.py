from django.db import models
from django.contrib.auth.models import User
from snapshots.models import Snapshot


class Comment(models.Model):
    """
    Comment model.  There is a 'One To Many' relationship
    with the User and Snapshot models.  Many comments can
    belong to a single User or a single Snapshot.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    snapshot = models.ForeignKey(Snapshot, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    body = models.TextField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.owner.username}'s comment {self.id}"
