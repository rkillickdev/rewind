from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model.
    The get_is_owner method is defined and returns a
    boolean value, dependent on whether the current
    user owns the instance of comment.  This is returned
    in the json response as the field 'is_owner'.
    The profile id and profile image of the comment's
    owner are also returned as part of the json response.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        model = Comment
        fields = [
            "id",
            "owner",
            "is_owner",
            "profile_id",
            "profile_image",
            "snapshot",
            "created_at",
            "updated_at",
            "body",
        ]


class CommentDetailSerializer(CommentSerializer):
    """
    Serializer for the Comment model used when accessing the Detail View.
    Inherits from CommentSerializer.
    Additionally, the 'snapshot' field is included for this serializer
    which references the snapshot id that the comment is associated with.
    """

    snapshot = serializers.ReadOnlyField(source="snapshot.id")
