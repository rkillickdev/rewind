from rest_framework import generics, permissions
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
    queryset = Snapshot.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SnapshotDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves an instance of Snapshot by id.
    If the user is logged in they can edit or delete the Snapshot.
    """

    serializer_class = SnapshotSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Snapshot.objects.all()