from django.conf.urls import url
from django.conf import settings

from .views import login, logout, register

app_name = 'users'


urlpatterns = [
    url(r'^register/$', register, name='register'),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),
]
