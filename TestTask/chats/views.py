from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def sign_in(request):
    data = request.body.decode()
    data = json.loads(data)
    login = data["login"]
    password = data["password"]


def sign_in_view(request):
    return render(request, "chats/signin.html", {})

@csrf_exempt
def sign_up(request):
    data = request.body.decode()
    data = json.loads(data)
    email = data["email"]
    login = data["login"]
    password = data["password"]
    try:
        user = User.objects.get(username=login)
        return JsonResponse({"message": "login already "})
    except:
        try:
            user = User.objects.get(email=email)
            return JsonResponse({"message":"email already "})
        except:
            user = User(username=login,
                        email=email,
                        password=password)
            user.save()
            return JsonResponse({"message":"all right "})

def sign_up_view(request):
    return render(request, "chats/signup.html", {})

@csrf_exempt
def chat(request):
    data = request.body.decode()
    data = json.loads(data)
    login = data["login"]
    password = data["password"]


def chat_view(request):
    return render(request, "chats/chat.html", {})