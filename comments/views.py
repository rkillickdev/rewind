from rest_framework import generics, permissions
from rewind.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer


class CommentList(generics.ListCreateAPIView):
    """
    Lists Comments.  If the user is logged in they can also
    create a comment.
    The perform_create method is defined so whenever a comment
    is created, the logged in user is associated with the newly
    created instance of Comment.  The 'owner' field of the
    serializer is populated with the user.
    """

    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves an instance of Comment by id.
    If the user is logged in they can edit or delete the Comment.
    """

    serializer_class = CommentDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Comment.objects.all()