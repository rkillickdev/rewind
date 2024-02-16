from rest_framework import generics, permissions
from .models import Category
from .serializers import CategorySerializer
from rewind.permissions import ReadOnly


class CategoryList(generics.ListCreateAPIView):
    """
    List and Create Category.  Only authenticated
    users can create an instance.
    """

    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser|ReadOnly]
    queryset = Category.objects.all().order_by("title")


class CategoryDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update an instance of Category by id.
    This view is only accessible to staff users.
    """

    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Category.objects.all()
