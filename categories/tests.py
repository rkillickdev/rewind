from django.contrib.auth.models import User
from .models import Category
from rest_framework import status
from rest_framework.test import APITestCase


class CategoryListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='rob', password='pass123')

    def test_can_list_categories(self):
        Category.objects.create(
            title='samples',
        )
        response = self.client.get('/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_regular_user_cant_create_category(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'title': 'samples',
        }
        response = self.client.post('/categories/', data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class CategoryDetailViewTests(APITestCase):
    def setUp(self):
        rob = User.objects.create_user(username='rob', password='pass123')
        
        Category.objects.create(
            title='samples',
        )

    def test_regular_user_cant_retrieve_category_using_valid_id(self):
        response = self.client.get('/categories/1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_regular_user_cant_update_category(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'title': 'samples'
        }
        response = self.client.put('/categories/1/', data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)