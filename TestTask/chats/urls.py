from django.contrib import admin
from django.urls import path
from .views import about, contact, sign_in_view, sign_up

urlpatterns = [
    path('about/', about),
    path('contact/', contact),
    path('', sign_in_view),
    path('sign_up', sign_up),
]