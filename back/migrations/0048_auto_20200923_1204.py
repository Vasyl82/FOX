# Generated by Django 3.1 on 2020-09-23 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0047_worker_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='foxuser',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='permit',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='project',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='workerdocument',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
