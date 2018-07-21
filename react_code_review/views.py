from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext



class IndexView(TemplateView):
    template_name = 'index.html'

class AuthView(TemplateView):
    template_name = 'auth.html'

def editorView(request):
    if request.user.is_superuser:
        return render_to_response(
            "editor.html",
            {'custom_context' : {}},
            RequestContext(request, {}),
        )
    else:
        return render_to_response(
            "index.html",
            {'custom_context' : {}},
            RequestContext(request, {}),
        )