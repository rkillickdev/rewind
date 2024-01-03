from django.db import models


class Genre(models.Model):
    """
    Genre Model.  Each instance of Genre stores a specific 
    style of music, an optional summary of the genre and an 
    optional image.
    """

    style = models.CharField(max_length=150)
    summary = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="images/genres/", default="../default_post_e32dts"
    )

    def __str__(self):
        return self.style
