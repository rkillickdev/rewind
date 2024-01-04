from django.urls import path
from recommendations import views

urlpatterns = [
    path("recommendations/", views.RecommendationList.as_view()),
    path("recommendations/<int:pk>/", views.RecommendationDetail.as_view()),
]
