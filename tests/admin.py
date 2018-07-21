from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import Test


class TestAdmin(ModelAdmin):
    list_display = ['name', 'author', 'description', 'created_at', 'available_until']

admin.site.register(Test, TestAdmin)