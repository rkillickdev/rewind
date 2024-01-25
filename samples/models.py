from django.db import models
from django.core.validators import FileExtensionValidator 
from django.contrib.auth.models import User
from snapshots.models import Snapshot
from cloudinary_storage.storage import RawMediaCloudinaryStorage


class Sample(models.Model):
    """
    Model to store instances of a sample.
    Each instance of Sample is related to a User instance
    and saved in the 'Owner' field.  This is a 'One to Many'
    relationship, where multiple samples could belong to a
    single user, but a single sample can only have one owner.
    Referenced the following article when determining how to
    upload audio files to Cloudinary:
    https://github.com/klis87/django-cloudinary-storage/blob/master/README.md
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    snapshot = models.ForeignKey(Snapshot, related_name="samples", on_delete=models.CASCADE)
    audio = models.FileField(
        upload_to="audio/snapshots/",
        storage=RawMediaCloudinaryStorage(),
        validators=[FileExtensionValidator( ['mp3'] ) ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.owner.username}'s sample {self.id}"

