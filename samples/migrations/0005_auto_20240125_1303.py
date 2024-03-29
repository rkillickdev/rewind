# Generated by Django 3.2.23 on 2024-01-25 13:03

import cloudinary_storage.storage
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snapshots', '0004_alter_snapshot_image'),
        ('samples', '0004_alter_sample_audio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sample',
            name='audio',
            field=models.FileField(storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='audio/snapshots/', validators=[django.core.validators.FileExtensionValidator(['mp4', 'mp3'])]),
        ),
        migrations.AlterField(
            model_name='sample',
            name='snapshot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='snapshots.snapshot'),
        ),
    ]
