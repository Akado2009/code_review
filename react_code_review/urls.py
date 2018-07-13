from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from .views import IndexView, AuthView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', login_required(IndexView.as_view()), name='main'),
    url(r'^auth/', AuthView.as_view(), name='auth'),
    url(r'^users/', include('users.urls', namespace='users')),
]