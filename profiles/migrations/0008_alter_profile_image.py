# Generated by Django 3.2.23 on 2024-01-31 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_auto_20240128_1537'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='../robot_djhwqf', upload_to='images/profiles/'),
        ),
    ]
