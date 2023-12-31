from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rewind.permissions import IsOwnerOrReadOnly
from .models import Snapshot
from .serializers import SnapshotSerializer


class SnapshotList(generics.ListCreateAPIView):
    """
    Lists Snapshots.  If the user is logged in they can also
    create a snapshot.
    The perform_create method is defined so whenever a snapshot
    is created, the logged in user is associated with the newly
    created instance of Snapshot.  The 'owner' field of the
    serializer is populated with the user.
    """

    serializer_class = SnapshotSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Snapshot.objects.annotate(
        comments_count=Count('comment', distinct=True),
        recommendations_count=Count('recommendations', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'recommendations__owner__profile',
        'owner__profile',
        'era',
        'genre',
        'category',
    ]
    search_fields = [
        'title',
        'era__decade',
        'genre__style',
        'category__title'
    ]
    ordering_fields = [
        'comments_count',
        'recommendations_count',
        'recommendations__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SnapshotDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves an instance of Snapshot by id.
    The user can edit or delete the retrieved Snapshot if they own it.
    """

    serializer_class = SnapshotSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Snapshot.objects.annotate(
        comments_count=Count('comment', distinct=True),
        recommendations_count=Count('recommendations', distinct=True)
    ).order_by('-created_at')
