from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    """
    Additional read only fields attached to the current user.
    """

    profile_id = serializers.ReadOnlyField(source="profile.id")
    profile_image = serializers.ReadOnlyField(source="profile.image.url")
    genre_preference = serializers.ReadOnlyField(
        source="profile.genre_preference.id"
    )
    era_preference = serializers.ReadOnlyField(
        source="profile.era_preference.id"
    )
    category_preference = serializers.ReadOnlyField(
        source="profile.category_preference.id"
    )

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            "profile_id",
            "profile_image",
            "genre_preference",
            "era_preference",
            "category_preference",
        )
