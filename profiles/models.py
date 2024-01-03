from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from eras.models import Era


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
    era_preferences = models.ManyToManyField(
        Era, related_name="era_pref", blank=True
    )
    # genre_preferences = models.ManyToManyField(
    #     Genre, related_name="genre_pref", blank=True
    # )
    # category_preferences = models.ManyToManyField(
    #     Category, related_name="cat_pref", blank=True
    # )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
