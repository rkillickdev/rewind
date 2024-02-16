from django.contrib.auth.models import User
from .models import Snapshot
from eras.models import Era
from genres.models import Genre
from categories.models import Category
from rest_framework import status
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile


class SnapshotListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='rob', password='pass123')

        self.era = Era.objects.create(
            decade="1980s",
        )
        self.genre = Genre.objects.create(
            style="Hip Hop",
        )
        self.category = Category.objects.create(
            title="Samples",
        )

        # Open and prepare test image file that can be submitted in test form
        with open("docs/tests/comment-test-image.jpg", "rb") as file:
            image_data = file.read()
        self.image_file = SimpleUploadedFile(name="test_image.jpg", content=image_data,
                                         content_type='image/jpeg')

    def test_can_list_snapshots(self):
        rob = User.objects.get(username='rob')
        Snapshot.objects.create(
            owner=rob,
            title='test title',
            era=self.era,
            genre=self.genre,
            category=self.category
        )
        response = self.client.get('/snapshots/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_logged_in_user_can_create_snapshot(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'title': 'test title',
            'era': 1,
            'genre': 1,
            'category': 1, 
            'image': self.image_file
        }
        response = self.client.post('/snapshots/', data=data)
        count = Snapshot.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class SnapshotDetailViewTests(APITestCase):
    def setUp(self):
        rob = User.objects.create_user(username='rob', password='pass123')
        mills = User.objects.create_user(username='mills', password='pass456')

        self.era = Era.objects.create(
            decade="1980s",
        )
        self.genre = Genre.objects.create(
            style="Hip Hop",
        )
        self.category = Category.objects.create(
            title="Samples",
        )
        
        Snapshot.objects.create(
            owner=rob,
            title='test title',
            era=self.era,
            genre=self.genre,
            category=self.category,
        )
        Snapshot.objects.create(
            owner=mills,
            title='another test title',
            era=self.era,
            genre=self.genre,
            category=self.category,
        )

    def test_can_retrieve_snapshot_using_valid_id(self):
        response = self.client.get('/snapshots/1/')
        self.assertEqual(response.data['title'], 'test title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_snapshot_using_invalid_id(self):
        response = self.client.get('/snapshots/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_snapshot(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'title': 'updated title',
            'era': 1,
            'genre': 1,
            'category': 1,
        }
        response = self.client.put('/snapshots/1/', data=data)
        snapshot = Snapshot.objects.filter(pk=1).first()
        self.assertEqual(snapshot.title, 'updated title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_snapshot(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'title': 'updated title',
            'era': 1,
            'genre': 1,
            'category': 1,
        }
        response = self.client.put('/snapshots/2/', data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_delete_own_snapshot(self):
        self.client.login(username='rob', password='pass123')
        response = self.client.delete('/snapshots/1/')
        self.assertFalse(Snapshot.objects.filter(pk=1).exists())
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_user_cant_delete_another_users_snapshot(self):
        self.client.login(username='rob', password='pass123')
        response = self.client.delete('/snapshots/2/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        