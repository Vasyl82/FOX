# Generated by Django 3.1 on 2020-10-01 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0053_notification_forward_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='forward_link',
        ),
        migrations.AddField(
            model_name='message',
            name='forward_link',
            field=models.URLField(default='https://www.google.com/'),
        ),
    ]
