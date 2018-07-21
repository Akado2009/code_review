from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Test, Question, Answer


class TestAdmin(ModelAdmin):
    list_display = ['name', 'author', 'description', 'created_at', 'available_until']


class QuestionAdmin(ModelAdmin):
    list_display = ['name', 'description', 'test']


class AnswerAdmin(ModelAdmin):
    list_display = ['user', 'question', 'content', 'mark', 'checked_by']


admin.site.register(Test, TestAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)