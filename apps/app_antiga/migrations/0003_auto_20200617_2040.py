# Generated by Django 3.0.6 on 2020-06-17 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_antiga', '0002_registrousuarios'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrousuarios',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
