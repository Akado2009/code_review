from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from .views import IndexView, AuthView, editorView

urlpatterns = [
    url(r'^$', login_required(IndexView.as_view()), name='main'), #/s
    url(r'^auth/', AuthView.as_view(), name='auth'),
    url(r'^editor/', editorView, name='editor'),

    url(r'^users/', include('users.urls', namespace='users')),

    url(r'^admin/', admin.site.urls), #/admin/

    url(r'^tests/', include('tests.urls', namespace='tests'))

]