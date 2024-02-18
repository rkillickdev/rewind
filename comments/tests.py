from django.contrib.auth.models import User
from .models import Comment
from snapshots.models import Snapshot
from eras.models import Era
from genres.models import Genre
from categories.models import Category
from rest_framework import status
from rest_framework.test import APITestCase


class CommentListViewTests(APITestCase):
    """
    Testing for Comment List View.
    """

    def setUp(self):
        """
        Setup creates user, era, genre and category to be
        used when creating a snapshot.
        """
        User.objects.create_user(username="rob", password="pass123")
        self.user = User.objects.get(username="rob")

        self.era = Era.objects.create(
            decade="1980s",
        )
        self.genre = Genre.objects.create(
            style="Hip Hop",
        )
        self.category = Category.objects.create(
            title="Samples",
        )
        self.snapshot = Snapshot.objects.create(
            owner=self.user,
            title="test title",
            era=self.era,
            genre=self.genre,
            category=self.category,
        )

    def test_can_list_comments(self):
        Comment.objects.create(
            owner=self.user,
            snapshot=self.snapshot,
            content="test comment",
        )
        response = self.client.get("/comments/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_comment(self):
        self.client.login(username="rob", password="pass123")
        data = {
            "snapshot": 1,
            "content": "test comment",
        }
        response = self.client.post("/comments/", data=data)
        count = Comment.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class CommentDetailViewTests(APITestCase):
    """
    Testing for Comment Detail View.
    """

    def setUp(self):
        """
        Setup creates 2 users, era, genre and category to be
        used when creating a test snapshot and 2 separate
        comments owned by different users.
        """
        rob = User.objects.create_user(username="rob", password="pass123")
        mills = User.objects.create_user(username="mills", password="pass456")

        self.era = Era.objects.create(
            decade="1980s",
        )
        self.genre = Genre.objects.create(
            style="Hip Hop",
        )
        self.category = Category.objects.create(
            title="Samples",
        )
        self.snapshot = Snapshot.objects.create(
            owner=rob,
            title="test title",
            era=self.era,
            genre=self.genre,
            category=self.category,
        )

        Comment.objects.create(
            owner=rob,
            snapshot=self.snapshot,
            content="test comment",
        )
        Comment.objects.create(
            owner=mills,
            snapshot=self.snapshot,
            content="another test comment",
        )

    def test_can_retrieve_comment_using_valid_id(self):
        response = self.client.get("/comments/1/")
        self.assertEqual(response.data["content"], "test comment")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_comment_using_invalid_id(self):
        response = self.client.get("/comments/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_comment(self):
        self.client.login(username="rob", password="pass123")
        response = self.client.put(
            "/comments/1/", {"content": "updated comment"}
        )
        comment = Comment.objects.filter(pk=1).first()
        self.assertEqual(comment.content, "updated comment")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_comment(self):
        self.client.login(username="rob", password="pass123")
        response = self.client.put(
            "/comments/2/", {"content": "updated comment"}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_delete_own_comment(self):
        self.client.login(username="rob", password="pass123")
        response = self.client.delete("/comments/1/")
        self.assertFalse(Comment.objects.filter(pk=1).exists())
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_user_cant_delete_another_users_comment(self):
        self.client.login(username="rob", password="pass123")
        response = self.client.delete("/comments/2/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
