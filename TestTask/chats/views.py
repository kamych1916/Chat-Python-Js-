from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *


@csrf_exempt
def sign_in(request):
    data = request.body.decode()
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    print(ip)
    data = json.loads(data)
    login = data["login"]
    password = data["password"]
    # try:
    user = User.objects.get(username=login)
    print(user.id)
    if user.password == password:
        session = Sessions(user=user,
                           ip=ip
                           )
        session.save()
        return redirect("/")
    else:
        return JsonResponse({"message": "wrong password"})
    # except:
    #     return JsonResponse({"message": "wrong login"})

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
        user = User.objects.get(username=login, password=password)

        return JsonResponse({"message": "login already used"})
    except:
        try:
            user = User.objects.get(email=email)
            return JsonResponse({"message":"email already used"})
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