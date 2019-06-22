from django.contrib import admin
from django.urls import path
from .views import sign_in_view, sign_in, sign_up_view, sign_up, chat_view

urlpatterns = [
    path('', sign_in_view),
    path('sign_up/', sign_up_view),
    path('POST_sign_up/', sign_up),
    path('POST_sign_in/', sign_in),
    path('chat/', chat_view),
]