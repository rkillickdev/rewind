from rest_framework import generics, permissions
from rewind.permissions import IsOwnerOrReadOnly
from .models import Recommendation
from .serializers import RecommendationSerializer


class RecommendationList(generics.ListCreateAPIView):
    """
    Lists Recommendations.  If the user is logged in they can
    also create a recommendation.
    The perform_create method is defined so whenever a recommendation
    is created, the logged in user is associated with the newly
    created instance of Recommendation.  The 'owner' field of the
    serializer is populated with the user.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = RecommendationSerializer
    queryset = Recommendation.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RecommendationDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieves an instance of Recommendation by id.
    A user can delete the retrieved Recommendation if they own it.
    """

    serializer_class = RecommendationSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Recommendation.objects.all()
