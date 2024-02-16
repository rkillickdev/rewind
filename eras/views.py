from rest_framework import generics, permissions
from .models import Era
from .serializers import EraSerializer


class EraList(generics.ListAPIView):
    """
    List and Eras.  Designed for regular users to be read only.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Era.objects.all()

class EraCreate(generics.CreateAPIView):
    """
    Create Eras.  Designed for admin users to create new instances.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Era.objects.all()


class EraDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Era by id.
    This view is only accessible to staff users.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Era.objects.all()
