from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Chats(models.Model):
    name = models.CharField(max_length=100, verbose_name="название")


    def __str__(self):
        return self.name
    class Meta():
        verbose_name = "Чат"
        verbose_name_plural = "Чаты"


class Chats_Users(models.Model):
    id_chat = models.ForeignKey(Chats, null=True, on_delete=False, verbose_name="чат")
    id_user = models.ForeignKey(User, null=True, on_delete=False, verbose_name="пользователь")

    def __str__(self):
        return self.id

    class Meta():
        verbose_name = "Чат-Пользователи"
        verbose_name_plural = "Чаты-Пользователи"

class Messages(models.Model):
    id_chat = models.ForeignKey(Chats, null=True, on_delete=False, verbose_name="чат")
    id_user = models.ForeignKey(User, null=True, on_delete=False, verbose_name="пользователь")
    text = models.CharField(max_length=100, verbose_name="текст")
    checked = models.BooleanField(default=False)
    time = models.CharField(max_length=100, verbose_name="текст", null=True)
    us_check = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.id

    class Meta():
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"

class Sessions(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=False, verbose_name="пользователь")
    ip = models.CharField(max_length=100, null=True)
    chat = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.id

    class Meta():
        verbose_name = "Сессия"
        verbose_name_plural = "Сессии"