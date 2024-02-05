from django.urls import path
from samples import views


urlpatterns = [
    path("samples/", views.SampleList.as_view()),
    path("samples/<int:pk>/", views.SampleDetail.as_view()),
]
