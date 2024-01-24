from django.contrib import admin
from .models import Sample


@admin.register(Sample)
class SampleAdmin(admin.ModelAdmin):

    def approve_samples(self, request, queryset):
        """
        Method for admin to approve samples
        in the Django admin panel.
        """
        queryset.update(approved=True)
