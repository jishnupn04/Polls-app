import datetime
from django.contrib import admin
from django.db import models
from django.utils import timezone
# Create your models here.
class Tags(models.Model):
    tag_name=models.CharField(max_length=200)
    def __str__(self):
        return self.tag_name
class Question(models.Model):
    question_txt=models.CharField(max_length=200)
   # pub_date=models.DateTimeField("Date published")
    tags=models.ManyToManyField(Tags)
    def __str__(self):
        return self.question_txt
    #@admin.display(
        #boolean=True,
        #ordering="pub_date",
        #description="Published Recently"
    #)
    # def was_published_recently(self):
        #return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
    def Tags(self):
        return list(self.Tags.values_list('tag_name', flat=True))

class Choice(models.Model):
    question=models.ForeignKey(Question,on_delete=models.CASCADE)
    choice_text=models.CharField(max_length=200)
    votes=models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text
