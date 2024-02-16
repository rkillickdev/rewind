from rest_framework import generics, permissions
from .models import Era
from .serializers import EraSerializer
from rewind.permissions import ReadOnly


class EraList(generics.ListCreateAPIView):
    """
    List and Create Eras.  Read only unless user has admin permissions.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAdminUser|ReadOnly]
    queryset = Era.objects.all().order_by("decade")


class EraDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Era by id.
    This view is only accessible to staff users.
    """

    serializer_class = EraSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Era.objects.all()
