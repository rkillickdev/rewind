from django.db import models


class Era(models.Model):
    """
    Era Model.  Each instance of Era stores a specific decade, an optional
    summary of the era and an optional image.
    """

    decade = models.CharField(max_length=5)
    summary = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="images/eras/", default="../default_post_e32dts"
    )

    def __str__(self):
        return self.decade
