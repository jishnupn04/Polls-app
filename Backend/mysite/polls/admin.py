from django.contrib import admin

# Register your models here.
from .models import Question,Choice,Tags

class TagsInline(admin.TabularInline):
    model = Question.tags.through
    extra = 1


class ChoiceInLine(admin.TabularInline):
    model=Choice 
    extra=0
    
class QuestionAdmin(admin.ModelAdmin):
    fieldsets=[
        (None,{"fields":["question_txt"]}),
    ]
    inlines=[ChoiceInLine,TagsInline]
    list_display=["question_txt"]
    #list_filter=["pub_date"]
    search_fields=["question_txt"]
admin.site.register(Question,QuestionAdmin)
