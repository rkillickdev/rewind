from rest_framework import generics, permissions
from rewind.permissions import IsOwnerOrReadOnly
from .models import Follower
from .serializers import FollowerSerializer


class FollowerList(generics.ListCreateAPIView):
    """
    Lists all instances of Follower.  Each instance
    represents a user following another user.
    If the user is logged in they can follow another
    user - i.e. create an instance of 'follower'.
    The perform_create method is defined so whenever
    an instance of 'follower' is created, the logged
    in user is associated with it.  The 'owner' field
    of the serializer is populated with the user.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowerDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieves an instance of Follower by id.
    A user can delete the retrieved instance of Follower
    if they own it.  This is the equivalent of an 'unfollow'.
    """

    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()
