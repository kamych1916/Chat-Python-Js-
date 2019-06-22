from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
import datetime

@csrf_exempt
def sign_in(request):
    data = request.body.decode()
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
        session.delete()
    except:
        pass
    print(ip)
    data = json.loads(data)
    login = data["login"]
    password = data["password"]
    try:
        user = User.objects.get(username=login)
    except:
        return JsonResponse({"message": "wrong login"})
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
def sign_out(request):
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return JsonResponse({"":"not deleted"})
    session.delete()
    return JsonResponse({"":"deleted"})

@csrf_exempt
def chat(request):
    data = request.body.decode()
    data = json.loads(data)
    login = data["login"]
    password = data["password"]


def chat_view(request):
    return render(request, "chats/chat.html", {})

@csrf_exempt
def add_chat(request):
    data = request.body.decode()
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')

    print(ip)

    data = json.loads(data)
    name = data["name"]
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return redirect('/sign_in')
    user = session.user
    ch = Chats(
        name=name,
    )
    ch.save()
    ch_us = Chats_Users(
        id_chat=ch,
        id_user=user
    )
    ch_us.save()
    return JsonResponse({"id":str(ch.id)})

@csrf_exempt
def get_chats(request):
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return redirect('/sign_in')
    user = session.user
    resp = []
    for ch_us in Chats_Users.objects.filter(id_user=user):
        chat = ch_us.id_chat
        name = chat.name
        id=str(chat.id)
        try:
            message = Messages.objects.get(id_chat=chat.id)
        except:
            message = None


        if message != None:
            last_message_text = message.text
            if message.checked:
                last_message_status = "checked"
            else:
                last_message_status = "unchecked"
            u = message.id_user
            last_message_user = user.login
        else:
            last_message_text = ""
            last_message_status = ""
            last_message_user = ""

        cht = {
            "id": id,
            "name": name,
            "last_message_text": last_message_text,
            "last_message_status": last_message_status,
            "last_message_user": last_message_user
        }
        resp.append(cht)
    return JsonResponse({"chats":resp})

@csrf_exempt
def add_message(request):
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return redirect('/sign_in')
    data = request.body.decode()
    data = json.loads(data)
    text = data["text"]
    id = data["id"]
    chat = Chats.objects.get(id=int(id))
    user = session.user
    time = datetime.datetime.now()
    time = str(time.hour) +"."+str(time.minute)
    message = Messages(
        id_chat = chat,
        id_user = user,
        text = text,
        time = time
    )
    message.save()
    return JsonResponse({"message":"allright"})


@csrf_exempt
def add_user_to_chat(request):
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return redirect('/sign_in')
    data = request.body.decode()
    data = json.loads(data)
    login = data["login"]
    chat_id = data["chat_id"]
    try:
        chat = Chats.objects.get(id=int(chat_id))
    except:
        return JsonResponse({"message"@csrf_exempt})


def get_messages(request):
    ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
    try:
        session = Sessions.objects.get(ip=ip)
    except:
        return redirect('/sign_in')
    : "error"})
    user = session.user
    try:
        ch_us = Chats_Users.objects.get(id_user = user,id_chat = chat)
    except:
        return JsonResponse({"message": "error"})
    try:
        user2 = User.objects.get(username=login)
    except:
        return JsonResponse({"message": "user does not exist"})
    try:
        ch_us = Chats_Users.objects.get(id_user = user2,id_chat = chat)
        return JsonResponse({"message": "user already in chat"})
    except:
        pass
    ch_us = Chats_Users(
                    id_user = user2,
                    id_chat = chat
                    )
    ch_us.save()
    return JsonResponse({"message": "all right"})

# @csrf_exempt
# def get_messages(request):
#     ip = request.META.get('REMOTE_ADDR', '') or request.META.get('HTTP_X_FORWARDED_FOR', '')
#     try:
#         session = Sessions.objects.get(ip=ip)
#     except:
#         return redirect('/sign_in')
#     data = request.body.decode()
#     data = json.loads(data)
#     chat_id = data["id"]
#     try:
#         m = Messages.objects.get()