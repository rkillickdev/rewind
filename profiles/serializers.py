from rest_framework import serializers
from .models import Profile
from followers.models import Follower
from eras.serializers import EraSerializer
from genres.serializers import GenreSerializer
from categories.serializers import CategorySerializer


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Profile Model.
    The owner of the profile is returned as part of the json response.
    This is a read only field and displays the username of the owner.
    The get_is_owner method is also defined, to determine whether the
    user making the request is the owner of the object.  This returns
    a boolean value and is included as the is_owner field in the json
    response.
    The get_following_id method is defined and returns the id for an instance
    of Follower if the logged in user is following another profile and None
    if they are not.  If a user is not logged in, the following_id returned
    for each instance of Profile will be None.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    snapshots_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                "Please choose an image smaller than 2MB"
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                "Image height larger than 4096px!"
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                "Image width larger than 4096px!"
            )
        return value

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    def get_following_id(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner
            ).first()
            return following.id if following else None
        return None

    class Meta:
        model = Profile
        fields = [
            "id",
            "owner",
            "created_at",
            "updated_at",
            "name",
            "bio",
            "image",
            "is_owner",
            "era_preference",
            "genre_preference",
            "category_preference",
            "following_id",
            "snapshots_count",
            "followers_count",
            "following_count",
        ]
