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

@login_required
def get_test_names(request):
    if request.method == 'GET':
        test_names = Test.objects.all().values('name', 'id')
        return JsonResponse({ 'data': list(test_names)})

@login_required
def delete_test(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        test_name = data['name']

        test_object = Test.objects.get(name=test_name)
        test_object.delete()
        return JsonResponse({'data': 'Successfully deleted.'})

@login_required
def get_questions_only(request):
    if request.method == 'GET':
        test_id = request.GET.get('id')[0]
        questions = Question.objects.filter(test__id=test_id).values('name', 'description', 'id')
        return JsonResponse({ 'data': list(questions)})

@login_required
def add_question(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        text = data.get('text')
        test_id = data.get('id')
        if not name:
            return JsonResponse({ 'data': {
                'response': 'error',
                'message': 'Enter a name'
            }})
        if not text:
            return JsonResponse({ 'data': {
                'response': 'error',
                'message': 'Enter text for the question'
            }})
        test = Test.objects.get(id=int(test_id))
        question = Question(name=name, description=text, test=test)
        question.save()
        return JsonResponse({ 'data': {
            'response': 'success',
            'message': 'Successfully added new question'
        }})

@login_required
def delete_question(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        question_id = data.get('id')
        question = Question.objects.get(id=int(question_id))
        question.delete()
        return JsonResponse({ 'data': {
            'response': 'success',
            'message': 'Question successfully deleted'
        }})

@login_required
def edit_question(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        question_id = data.get('id')
        name = data.get('name')
        text = data.get('text')
        if not name:
            return JsonResponse({ 'data': {
                'response': 'error',
                'message': 'Enter a name'
            }})
        if not text:
            return JsonResponse({ 'data': {
                'response': 'error',
                'message': 'Enter text for the question'
            }})
        question = Question.objects.get(id=int(question_id))
        question.name = name
        question.description = text
        question.save()
        return JsonResponse({ 'data': {
            'response': 'success',
            'message': 'Question successfully updated'
        }})