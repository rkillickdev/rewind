from rest_framework import generics, permissions
from rewind.permissions import IsOwnerOrReadOnly
from .models import Pin
from .serializers import PinSerializer


class PinList(generics.ListCreateAPIView):
    """
    Lists Pins.  If the user is logged in they can also create a pin.
    The perform_create method is defined so whenever a pin is created,
    the logged in user is associated with the newly created instance of
    Pin.  The 'owner' field of the serializer is populated with the user.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PinSerializer
    queryset = Pin.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PinDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieves an instance of Pin by id.
    A user can delete the retrieved Pin if they own it.
    """

    serializer_class = PinSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Pin.objects.all()
