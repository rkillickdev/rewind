from django.contrib.auth.models import User
from .models import Snapshot
from eras.models import Era
from genres.models import Genre
from categories.models import Category
from rest_framework import status
from rest_framework.test import APITestCase


# class SnapshotListViewTests(APITestCase):
#     def setUp(self):
#         User.objects.create_user(username='rob', password='pass123')

#         self.era = Era.objects.create(
#             decade="1980s",
#         )
#         self.genre = Genre.objects.create(
#             style="Hip Hop",
#         )
#         self.category = Category.objects.create(
#             title="Samples",
#         )

#     def test_can_list_snapshots(self):
#         rob = User.objects.get(username='rob')
#         Snapshot.objects.create(
#             owner=rob,
#             title='test title',
#             era=self.era,
#             genre=self.genre,
#             category=self.category
#         )
#         response = self.client.get('/snapshots/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # print(response.data)
#         # print(len(response.data))
    
#     def test_logged_in_user_can_create_snapshot(self):
#         self.client.login(username='rob', password='pass123')
#         response = self.client.post('/snapshots/', {'title': 'test title', 'image': 'test image', 'era': 1, 'genre': 1, 'category': 1})
#         print(response.data)
#         # count = Snapshot.objects.count()
#         # self.assertEqual(count, 1)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# class SnapshotDetailViewTests(APITestCase):
#     def setUp(self):
#         rob = User.objects.create_user(username='rob', password='pass123')
#         mills = User.objects.create_user(username='mills', password='pass456')

#         self.era = Era.objects.create(
#             decade="1980s",
#         )
#         self.genre = Genre.objects.create(
#             style="Hip Hop",
#         )
#         self.category = Category.objects.create(
#             title="Samples",
#         )
        
#         Snapshot.objects.create(
#             owner=rob,
#             title='test title',
#             era=self.era,
#             genre=self.genre,
#             category=self.category
#         )
#         Snapshot.objects.create(
#             owner=mills,
#             title='another test title',
#             era=self.era,
#             genre=self.genre,
#             category=self.category
#         )

#     def test_can_retrieve_snapshot_using_valid_id(self):
#         response = self.client.get('/snapshots/1/')
#         self.assertEqual(response.data['title'], 'test title')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_cant_retrieve_snapshot_using_invalid_id(self):
#         response = self.client.get('/snapshots/999/')
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # def test_user_can_update_own_snapshot(self):
    #     self.client.login(username='rob', password='pass123')
    #     response = self.client.put('/snapshots/1/', {'title': 'updated title'})
    #     snapshot = Snapshot.objects.filter(pk=1).first()
    #     self.assertEqual(snapshot.title, 'updated title')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_user_cant_update_another_users_post(self):
    #     self.client.login(username='adam', password='pass')
    #     response = self.client.put('/posts/2/', {'title': 'a new title'})
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)