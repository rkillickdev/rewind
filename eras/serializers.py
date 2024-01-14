from rest_framework import serializers
from .models import Era


class EraSerializer(serializers.ModelSerializer):
    """
    Serializer for the Era Model.
    """

    class Meta:
        model = Era
        fields = ["id", "decade", "summary", "image"]
