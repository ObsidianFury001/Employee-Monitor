# Generated by Django 5.0.1 on 2024-01-15 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserAPI', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Users',
            new_name='user',
        ),
    ]
