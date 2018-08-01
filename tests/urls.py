from django.conf.urls import url
from django.conf import settings

from .views import fetch_all_tests, get_questions, save_answer, save_all_answers, get_test_names, \
                   delete_test, get_questions_only, add_question, delete_question, edit_question, \
                   get_students, get_answer, submit_mark, add_test

app_name = 'tests'


urlpatterns = [
    url(r'^get_tests/$', fetch_all_tests, name='fetch_all_tests'),
    url(r'^get_questions/$', get_questions, name='get_questions'),
    url(r'^save_answer/$', save_answer, name='save_answer'),
    url(r'^save_all_answers/$', save_all_answers, name='save_all_answers'),
    url(r'^get_test_names/$', get_test_names, name='get_test_names'),
    url(r'^delete_test/$', delete_test, name='delete_test'),
    url(r'^get_questions_only/$', get_questions_only, name='get_questions_only'),
    url(r'^add_question/$', add_question, name='add_question'),
    url(r'^delete_question/$', delete_question, name='delete_question'),
    url(r'^edit_question/$', edit_question, name='edit_question'),
    url(r'^get_students/$', get_students, name='get_students'),
    url(r'^get_answer/$', get_answer, name='get_answer'),
    url(r'^submit_mark/$', submit_mark, name='submit_mark'),
    url(r'^add_test/$', add_test, name='add_test')
]
