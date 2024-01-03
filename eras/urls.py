from django.urls import path
from eras import views


urlpatterns = [
    path("eras/", views.EraList.as_view()),
    path("eras/<int:pk>/", views.EraDetail.as_view()),
]
