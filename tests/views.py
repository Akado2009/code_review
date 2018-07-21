from django.utils import timezone
from time import strftime


from .models import Test

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


@login_required
def fetch_all_tests(request):
    if request.method == 'GET':
        tests = Test.objects.all()
        data = []
        now = timezone.now()
        for test in tests:
            data.append({
                'name': test.name,
                'id': test.id,
                'author': test.author.username,
                'created_at': test.created_at.strftime("%a, %d %b %Y %H:%M:%S"),
                'available': test.available_until < now,
                'description': test.description
            })
        return JsonResponse({ 'data': data })

@login_required
def get_questions(request):
    if request.method == 'GET':
        user_id = request.user.id
        test_id = request.GET.get('id')[0]
        return JsonResponse({ 'data': [
            {
                'name': 'First question',
                'text': 'TASK DESCRIPTION'
            },
            {
                'name': 'Second question',
                'text': 'TASK DESCRIPTION'
            },
            {
                'name': 'Third question',
                'text': 'TASK DESCRIPTION'
            },
        ] })