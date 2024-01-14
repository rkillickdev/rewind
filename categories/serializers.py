from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category Model.
    """

    class Meta:
        model = Category
        fields = ["id", "title", "summary", "image"]
