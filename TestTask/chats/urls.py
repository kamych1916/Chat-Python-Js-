from django.contrib import admin
from django.urls import path
from .views import *#sign_in_view, sign_in, sign_up_view, sign_up, chat_view, add_chat, sign_out, get_chats, add_message

urlpatterns = [
    path('', chat_view),
    path('sign_out/', sign_out),
    path('POST_add_chat/', add_chat),
    path('sign_in/', sign_in_view),
    path('sign_up/', sign_up_view),
    path('POST_sign_up/', sign_up),
    path('POST_sign_in/', sign_in),
    path('chat/', chat_view),
    path('GET_chats/', get_chats),
    path('add_message/', add_message),
    path('add_user_to_chat/', add_user_to_chat),
]