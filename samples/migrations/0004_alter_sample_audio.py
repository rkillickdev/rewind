# Generated by Django 3.2.23 on 2024-01-24 22:47

import cloudinary_storage.storage
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('samples', '0003_alter_sample_audio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sample',
            name='audio',
            field=models.FileField(storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='audio/snapshots/', validators=[django.core.validators.FileExtensionValidator(['mp4'])]),
        ),
    ]
