from django.contrib.auth import authenticate, login as django_login, logout as django_logout, get_user_model
from django.http import JsonResponse

import json

# from django.contrib.auth import authenticate, login as django_login, logout as django_logout, get_user_model
# from django.http import JsonResponse
# from django.views.generic import TemplateView
# from django.core.mail import send_mail
# from django.conf import settings
# from django.contrib.auth.decorators import login_required
# from django.contrib.auth.models import User


# from rest_framework import generics as drf_generics

# from pandora.models import AccessRequest, Profile
def register(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            name = data.get('name')
            surname = data.get('surname')

            if get_user_model().objects.filter(username=username).exists():
                return JsonResponse({'response': 'error', 'text': 'User already exists.', 'data': 'exists'})

            user = get_user_model().objects.create_user(
                username=username, password=password, first_name=name, last_name=surname, is_staff=False
            )

            return JsonResponse({'response': 'success'})
    except Exception as e:
        print(str(e))
        return JsonResponse({'response': 'error', 'data': 'wrong', 'text': 'Something went wrong.'})

def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            django_login(request, user)
            return JsonResponse({'response': 'success'})

        return JsonResponse({'response': 'error'})

def logout(request):
    django_logout(request)
    return JsonResponse({'data' : 'success'})