from django.conf.urls import url
from django.conf import settings

from .views import fetch_all_tests, get_questions, save_answer, save_all_answers

app_name = 'tests'


urlpatterns = [
    url(r'^get_tests/$', fetch_all_tests, name='fetch_all_tests'),
    url(r'^get_questions/$', get_questions, name='get_questions'),
    url(r'^save_answer/$', save_answer, name='save_answer'),
    url(r'^save_all_answers/$', save_all_answers, name='save_all_answers'),
]
