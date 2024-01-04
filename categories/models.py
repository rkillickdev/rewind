from django.db import models


class Category(models.Model):
    """
    Category Model.  Each instance of Category stores a specific
    type of interest, an optional summary of the category and an
    optional image.
    """

    title = models.CharField(max_length=150)
    summary = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="images/categories/", default="../default_post_e32dts"
    )

    def __str__(self):
        return self.title
