# Generated by Django 5.0.4 on 2024-05-01 15:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_tags_alter_question_pub_date_question_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='pub_date',
        ),
    ]
