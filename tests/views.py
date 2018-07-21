from django.utils import timezone
from time import strftime
import json


from .models import Test, Question, Answer

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from django.contrib.auth.models import User


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
        questions = Question.objects.filter(test__id=test_id)
        questions = sorted(questions, key=lambda x: x.id)

        question_data = []
        answer_data = []
        for question in questions:
            question_data.append({
                'id': question.id,
                'name': question.name,
                'text': question.description
            })
            test = Test.objects.get(id=test_id)
            user = User.objects.get(id=user_id)
            question = Question.objects.get(id=question.id)
            answer, _ = Answer.objects.get_or_create(user=user, question=question)
            answer_data.append({
                'id': answer.id,
                'content': answer.content
            })

        return JsonResponse({ 'data': {
            'questions': question_data,
            'answers': answer_data
        } })

@login_required
def save_answer(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_id = request.user.id
            answer_id = data.get('id')
            new_content = data.get('answer')
            answer = Answer.objects.get(id=answer_id)
            answer.content = new_content
            answer.save()
            return JsonResponse({ 'data': 'Answer submitted.'})
        except Exception as e:
            print(str(e))
            return JsonResponse({ 'data': 'error' })

@login_required
def save_all_answers(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            for answer in data.get('answers'):
                answer_object = Answer.objects.get(id=int(answer['id']))
                if answer['content'] == '':
                    answer['content'] = ' '
                answer_object.content = answer['content']
                answer_object.save()
            return JsonResponse({'data': 'Answers successfully submitted.'})
        except Exception as e:
            print(str(e))
            return JsonResponse({ 'data': 'error' })