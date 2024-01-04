from django.urls import path
from snapshots import views


urlpatterns = [
    path("snapshots/", views.SnapshotList.as_view()),
    path("snapshots/<int:pk>/", views.SnapshotDetail.as_view()),
]
