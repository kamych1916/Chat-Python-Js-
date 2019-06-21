from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
import json

# Create your views here.



def sign_in_view(request):
    return render(request, "index.html", {})
    # html = render(request, "index.html", {})
    # print(html.content)
    # return HttpResponse(html)

def sign_up(request):
    data = request.body.decode()
    data = json.loads(data)
    email = data["email"]
    login = data["login"]
    password = data["password"]
    try:
        user = User.objects.get(username=login)
    except:
        try:
            user = User.objects.get(email=email)
            return JsonResponse({"message":"email "})
        except:
            user = User(username=login,
                        email=email,
                        password=password)
            user.save()
            return render(request, "index.html", {})
    # html = render(request, "index.html", {})
    # print(html.content)
    # return HttpResponse(html)



def about(request):
    return HttpResponse("<h2>О сайте</h2>")


def contact(request):
    return HttpResponse("<h2>Контакты</h2>")