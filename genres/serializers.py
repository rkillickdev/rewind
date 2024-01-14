from rest_framework import serializers
from .models import Genre


class GenreSerializer(serializers.ModelSerializer):
    """
    Serializer for the Genre Model.
    """

    class Meta:
        model = Genre
        fields = ["id", "style", "summary", "image"]