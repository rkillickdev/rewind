from rest_framework import generics, permissions
from .models import Era
from .serializers import EraSerializer


class EraList(generics.ListCreateAPIView):
    """
    List and Create Eras.   Only authenticated
    users can create an instance.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Era.objects.all()


class EraDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Era by id.
    This view is only accessible to staff users.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Era.objects.all()
