from django.contrib import admin
from django.urls import path
from .views import about, contact, sign_in_view

urlpatterns = [
    path('about/', about),
    path('contact/', contact),
    path('', sign_in_view),
]