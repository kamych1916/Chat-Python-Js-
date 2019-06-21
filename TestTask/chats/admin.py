from django.contrib import admin
from .models import Messages, Chats, Chats_Users
# Register your models here.
admin.site.register(Messages)
admin.site.register(Chats)
admin.site.register(Chats_Users)
