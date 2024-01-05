from django.db.models import Count
from rest_framework import generics, filters
from rewind.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer, ProfileListSerializer


class ProfileList(generics.ListAPIView):
    """
    Lists all profiles.
    No Create view required, as profile creation handled by Django signals.
    """

    queryset = Profile.objects.annotate(
        snapshots_count=Count('owner__snapshot', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)

    ).order_by('-created_at')
    serializer_class = ProfileListSerializer
    filter_backends = [
        filters.OrderingFilter
    ]
    ordering_fields = [
        'snapshots_count',
        'followers_count',
        'following_count',
        'owner__followed__created_at',
        'owner__following__created_at',
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update profile.  The profile can only
    be updated if the user is the owner.
    """

    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        snapshots_count=Count('owner__snapshot', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)

    ).order_by('-created_at')
    serializer_class = ProfileSerializer
