# Generated by Django 3.1 on 2020-11-18 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0072_auto_20201117_1433'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='submit_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]