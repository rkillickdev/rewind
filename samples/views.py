from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rewind.permissions import IsOwnerOrReadOnly
from .models import Sample
from .serializers import SampleSerializer, SampleDetailSerializer


class SampleList(generics.ListCreateAPIView):
    """
    Lists Samples.  If the user is logged in they can also
    create a sample.
    The perform_create method is defined so whenever a sample
    is created, the logged in user is associated with the newly
    created instance of Sample.  The 'owner' field of the
    serializer is populated with the user.
    """

    serializer_class = SampleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Sample.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['snapshot']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SampleDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieves an instance of Sample by id.
    The User can delete the retrieved Sample if they own it.
    """

    serializer_class = SampleDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Sample.objects.all()