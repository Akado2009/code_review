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