# Generated by Django 3.1 on 2020-10-09 08:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0056_template'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='template',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='templates', to='back.template'),
        ),
    ]
