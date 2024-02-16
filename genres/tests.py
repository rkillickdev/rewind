from django.contrib.auth.models import User
from .models import Genre
from rest_framework import status
from rest_framework.test import APITestCase


class GenreListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username="rob", password="pass123")

    def test_can_list_genres(self):
        Genre.objects.create(
            style="house",
        )
        response = self.client.get("/genres/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_regular_user_cant_create_genre(self):
        self.client.login(username="rob", password="pass123")
        data = {
            "style": "house",
        }
        response = self.client.post("/genres/", data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class GenreDetailViewTests(APITestCase):
    def setUp(self):
        rob = User.objects.create_user(username="rob", password="pass123")

        Genre.objects.create(
            style="house",
        )

    def test_regular_user_cant_retrieve_genre_using_valid_id(self):
        response = self.client.get("/genres/1/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_regular_user_cant_update_genre(self):
        self.client.login(username="rob", password="pass123")
        data = {"style": "house"}
        response = self.client.put("/genres/1/", data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
