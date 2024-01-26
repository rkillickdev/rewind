from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rewind.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


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
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__following__followed__profile',
        'owner__followed__owner__profile',
        'era_preference__id',
        'genre_preference__id',
        'category_preference__id',
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
