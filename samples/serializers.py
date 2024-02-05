from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from samples.models import Sample


class SampleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sample model.
    The get_is_owner method is defined and returns a
    boolean value, dependent on whether the current
    user owns the instance of sample.  This is returned
    in the json response as the field 'is_owner'.
    The profile id and profile image of the samples's
    owner are also returned as part of the json response.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    created_at = serializers.SerializerMethodField()

    def validate_audio(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                "Please choose a file smaller than 2MB"
            )
        return value

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    class Meta:
        model = Sample
        fields = [
            "id",
            "owner",
            "is_owner",
            "profile_id",
            "profile_image",
            "snapshot",
            "audio",
            "created_at",
            "approved",
        ]


class SampleDetailSerializer(SampleSerializer):
    """
    Serializer for the Sample model used when accessing the Detail View.
    Inherits from SampleSerializer.
    Additionally, the 'snapshot' field is included for this serializer
    which references the snapshot id that the sample is associated with.
    """

    snapshot = serializers.ReadOnlyField(source="snapshot.id")
