# Generated by Django 3.2.23 on 2024-01-12 18:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('eras', '0001_initial'),
        ('genres', '0001_initial'),
        ('snapshots', '0002_auto_20240112_1825'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snapshot',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.category'),
        ),
        migrations.AlterField(
            model_name='snapshot',
            name='era',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='eras.era'),
        ),
        migrations.AlterField(
            model_name='snapshot',
            name='genre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='genres.genre'),
        ),
    ]
