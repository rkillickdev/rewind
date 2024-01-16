from rest_framework import serializers
from snapshots.models import Snapshot
from recommendations.models import Recommendation
from pins.models import Pin


class SnapshotSerializer(serializers.ModelSerializer):
    """ 
    Serializer for the Snapshot Model.
    The owner of the snapshot is returned as part of the json response.
    This is a read only field and displays the username of the owner.
    The get_is_owner method is also defined, to determine whether the
    user making the request is the owner of the object.  This returns
    a boolean value and is included as the is_owner field in the json
    response.
    The get_recommendation_id method is defined and returns the id for an
    instance of Recommendation if the logged in user has recommended another
    snapshot and None if they have not.  If user is not logged in,
    recommendation_id returned for each instance of Snapshot will be None.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    # era = serializers.StringRelatedField()
    # genre = serializers.StringRelatedField()
    # category = serializers.StringRelatedField()
    # category_name = serializers.RelatedField(source='category', read_only=True)
    # era_decade = serializers.ReadOnlyField(source='era.decade')
    # genre_style = serializers.ReadOnlyField(source='genre.style')
    # category_title = serializers.ReadOnlyField(source='category.title')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    recommendation_id = serializers.SerializerMethodField()
    pin_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    recommendations_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError('Please choose an image smaller than 2MB')
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    def get_recommendation_id(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            recommendation = Recommendation.objects.filter(
                owner=user, snapshot=obj  
            ).first()
            return recommendation.id if recommendation else None
        return None

    def get_pin_id(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            pin = Pin.objects.filter(
                owner=user, snapshot=obj  
            ).first()
            return pin.id if pin else None
        return None

    class Meta:
        model = Snapshot
        fields = [
            "id",
            "owner",
            "is_owner",
            "profile_id",
            "profile_image",
            "created_at",
            "updated_at",
            "title",
            "description",
            "image",
            "soundbyte",
            "era",
            "genre",
            "category",
            "recommendation_id",
            "pin_id",
            "comments_count",
            "recommendations_count",
        ]
