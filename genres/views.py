from rest_framework import generics, permissions
from .models import Genre
from .serializers import GenreSerializer


class GenreList(generics.ListCreateAPIView):
    """
    List and Create Genres.  This view is only accessible
    to staff users.
    """

    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Genre.objects.all()


class GenreDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Genre by id.
    This view is only accessible to staff users.
    """

    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Genre.objects.all()