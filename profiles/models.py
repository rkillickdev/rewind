from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from eras.models import Era
from genres.models import Genre
from categories.models import Category


class Profile(models.Model):
    """
    Profile Model.  Related to a User instance via a One To One Field.
    When updating their profile, a user can select their preferences of
    era, genre and category.  These models have a many to many relationship
    with the Profile model.
    """

    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=25, blank=True)
    bio = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="images/profiles/", default="../default_profile_oeycka"
    )
   
    era_preference = models.ForeignKey(
        Era, on_delete=models.CASCADE, blank=True,
        null=True
    )
    genre_preference = models.ForeignKey(
        Genre, on_delete=models.CASCADE, blank=True,
        null=True
    )
    category_preference = models.ForeignKey(
        Category, on_delete=models.CASCADE, blank=True,
        null=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
