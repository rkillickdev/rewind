from rest_framework import generics, permissions
from .models import Genre
from .serializers import GenreSerializer
from rewind.permissions import ReadOnly


class GenreList(generics.ListCreateAPIView):
    """
    List and Create Eras.  Read only unless user has admin permissions.
    """

    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]
    queryset = Genre.objects.all().order_by("style")


class GenreDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Genre by id.
    This view is only accessible to staff users.
    """

    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Genre.objects.all()
