import uuid

from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models
from django.core.validators import MinValueValidator

from mptt.models import MPTTModel, TreeForeignKey


class Test(models.Model):
    name = models.CharField(max_length=128, unique=True, verbose_name='Name')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    available_until = models.DateTimeField()
    description = models.CharField(max_length=4096, unique=True, verbose_name='Description')

class Question(models.Model):
    name = models.CharField(max_length=128, verbose_name='Name')
    description = models.CharField(max_length=4096, unique=True, verbose_name='Description')
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.CharField(max_length=409600, verbose_name='Content')
    mark = models.IntegerField(verbose_name='Mark', null=True)
    checked_by = models.CharField(max_length=128, unique=True, verbose_name='Inspector', null=True)