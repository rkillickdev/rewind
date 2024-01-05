from django.urls import path
from pins import views

urlpatterns = [
    path("pins/", views.PinList.as_view()),
    path("pins/<int:pk>/", views.PinDetail.as_view()),
]
