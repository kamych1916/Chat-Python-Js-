# Generated by Django 2.2.2 on 2019-06-21 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='chats',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='название')),
            ],
            options={
                'verbose_name': 'Чат',
                'verbose_name_plural': 'Чаты',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=100, verbose_name='логин')),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
            },
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100, verbose_name='текст')),
                ('checked', models.BooleanField(default=False)),
                ('id_chat', models.ForeignKey(null=True, on_delete=False, to='chats.chats', verbose_name='чат')),
                ('id_user', models.ForeignKey(null=True, on_delete=False, to='chats.Users', verbose_name='пользователь')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
            },
        ),
        migrations.CreateModel(
            name='Chats_Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_chat', models.ForeignKey(null=True, on_delete=False, to='chats.chats', verbose_name='чат')),
                ('id_user', models.ForeignKey(null=True, on_delete=False, to='chats.Users', verbose_name='пользователь')),
            ],
            options={
                'verbose_name': 'Чат-Пользователи',
                'verbose_name_plural': 'Чаты-Пользователи',
            },
        ),
    ]