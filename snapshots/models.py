from django.db import models
from django.contrib.auth.models import User
from eras.models import Era
from genres.models import Genre
from categories.models import Category


class Snapshot(models.Model):
    """
    Model to store instances of a snapshot.
    Each instance of Snapshot is related to a User instance
    and saved in the 'Owner' field.  This is a 'One to Many'
    relationship, where multiple snapshots could belong to a
    single user, but a single snapshot can only have one owner.
    There is also a 'One to Many' relationship between the Era,
    Genre and Category models.  Each instance of Snapshot can
    only be associated with one Era, Genre and Category but an
    instance of Era, Genre or Gategory can belong to many
    instances of Snapshot.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="images/snapshots/",
    )
    soundbyte = models.FileField(upload_to="audio/snapshots/", blank=True)
    era = models.ForeignKey(Era, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.id} {self.title}"
