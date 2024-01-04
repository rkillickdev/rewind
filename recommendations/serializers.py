from django.db import IntegrityError
from rest_framework import serializers
from .models import Recommendation


class RecommendationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Recommendation model.
    The create method uses the unique_constraint fields specified
    in the Recommendation model to check that the owner has not
    already recommended the snapshot before a new instance is created.
    """

    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Recommendation
        fields = ["id", "created_at", "owner", "snapshot"]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({"detail": "possible duplicate"})
