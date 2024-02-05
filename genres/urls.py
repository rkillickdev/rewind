from django.urls import path
from genres import views


urlpatterns = [
    path("genres/", views.GenreList.as_view()),
    path("genres/<int:pk>/", views.GenreDetail.as_view()),
]
