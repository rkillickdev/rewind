from django.contrib.auth.models import User
from .models import Era
from rest_framework import status
from rest_framework.test import APITestCase

class EraListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='rob', password='pass123')

    def test_can_list_eras(self):
        Era.objects.create(
            decade='1980s',
        )
        response = self.client.get('/eras/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_regular_user_cant_create_era(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'decade': '1980s',
        }
        response = self.client.post('/eras/', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class EraDetailViewTests(APITestCase):
    def setUp(self):
        rob = User.objects.create_user(username='rob', password='pass123')
        
        Era.objects.create(
            decade='1980s',
        )

    def test_regular_user_cant_retrieve_era_using_valid_id(self):
        response = self.client.get('/eras/1/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_regular_user_cant_update_era(self):
        self.client.login(username='rob', password='pass123')
        data = {
            'decade': '1990s'
        }
        response = self.client.put('/eras/1/', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)




