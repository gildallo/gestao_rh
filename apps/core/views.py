from django.shortcuts import render


def home(request):
    render(request, 'core/index.html')
