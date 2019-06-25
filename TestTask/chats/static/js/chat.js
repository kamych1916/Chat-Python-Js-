//Функция добавления чата в список чатов.
function insertListChat(idd, nameChat, lastMess_text, lastMess_status, lastMess_userName){
    var control = "";
    if (lastMess_text == "" && lastMess_userName == ""){
        lastMess_text = "пусто";
        lastMess_userName = "пусто";
    }
    if (lastMess_status == "unchecked"){
        control =
                  '<span onclick="giveIdChat('+idd+')" style="cursor: pointer; color: black">' +
                  '<li style="background:whitesmoke; border-bottom: 1px solid #ccc;">' +
                        '<div style="word-wrap:break-word; padding: 15px 0 15px 15px;">' +
                                '<p style="margin: 0; padding: 0">' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                                '<p style="margin: 0; padding: 0">' + '<small >' + lastMess_userName + ': </small>' + '<small>'  + lastMess_text + '</small>'+ '</p>' +
                        '</div>' +
                  '</li>'+
                  '</span>';
    }else{
        control =
                  '<span onclick="giveIdChat('+idd+')" style="cursor: pointer; color: black">' +
                      '<li style="background:white; border-bottom: 1px solid #ccc;">' +
                            '<div style="word-wrap:break-word; padding: 15px 0 15px 15px;">' +
                                    '<p style="margin: 0; padding: 0">' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                                    '<p style="margin: 0; padding: 0">' + '<small >' + lastMess_userName + ': </small>' + '<small>'  + lastMess_text + '</small>'+ '</p>' +
                            '</div>' +
                      '</li>'+
                  '</span>';
    }

    setTimeout(
        function(){
            $(".listChats").append(control).scrollTop($(".listChat").prop('scrollHeight'));;
        });
}

//Функция которая отсылает на сервер id выбранного чата
function giveIdChat(idd){
      location.reload();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://127.0.0.1:8000/add_num_chat/', true);
      data = {
        id: idd
      }
      data = JSON.stringify(data);
      xhr.onload = function(e){
          if (xhr.status != 200) {
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            var data = JSON.parse(xhr.responseText);
            if (data.message != ""){
                console.log(data.message)
            }
          }
      }
      xhr.send(data);
}

// Запрос на получение чатов из базы данных, запуск лонг пулл запроса и отображение всех сообщений по заданному id
function getListChats(){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/GET_chats/', true);
      xhr.onload = function(e){
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
                var data = JSON.parse(xhr.responseText);
                if (data.errorMessage == "0"){
                    document.location.href = "http://127.0.0.1:8000/sign_in";
                }
                if (data.chats != ""){
                    for (var idx = 0; idx < data.chats.length; idx++ ){
                        insertListChat(data.chats[idx].id, data.chats[idx].name, data.chats[idx].last_message_text, data.chats[idx].last_message_status, data.chats[idx].last_message_user)
                    }
                    id_chat = data.chats[0].id;
                    ShowMessages(id_chat);
                    ShowLastMessage();
                }
            }
          }
      xhr.send();
}

//Функция-запрос для добавления чата в базу данных
function AddChat(nameChat) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/POST_add_chat/', true);
    alert(nameChat)
    data = {
        name: nameChat,
    }
    data = JSON.stringify(data);
    xhr.onload = function(e){
      if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        var data = JSON.parse(xhr.responseText);
      }
    }
    xhr.send(data);
}

//Функция-запрос для добавления пользователя в базу данных с определнным id чатом
function AddUserChat(loginUser) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/add_user_to_chat/', true);
    data = {
    login: loginUser,
    chat_id: id_chat,
    }
    data = JSON.stringify(data);
    xhr.onload = function(e){
      if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        var data = JSON.parse(xhr.responseText);
        if(data.message == "error1"){
            alert('чат не найден')
        }
        else if(data.message == "error2"){
            alert('ошибка')
        }
        else if (data.message == "user already in chat"){
            alert('пользователь уже находится в чате!')
        }
        else if (data.message == "user does not exist"){
            alert('данного пользователя нет в системе!')
        }
      }
    }
    xhr.send(data);
}

// функция возвращающая время
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//Функция добавления сообщения в чат.
function insertChat(who, text, user){
    var control = "";
    var date = formatAMPM(new Date());
    if (who == "me"){
        control =     '<li style="width:100%;">' +
                            '<div style="word-wrap:break-word;float:right; background:whitesmoke;margin-top:15px;min-width:35%;max-width:80%;width:auto;border-radius:5px;padding:5px;display:flex; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">' +
                                '<div class="text text-r">' +
                                    '<p>' + '<small>'+ user +'</small>' + ' ' + '<small>'+date+'</small></p>' +
                                    '<p>'+ text +'</p>' +
                                '</div>' +
                            '</div>' +
                      '</li>';

    }else{
    control = '<li style="width:100%">' +
                        '<div style="word-wrap:break-word;float:left;background:whitesmoke;margin-top:15px;min-width:35%;max-width:80%;width:auto;border-radius:5px;padding:11px;display:flex; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">' +
                            '<div class="text text-l">' +
                                '<p>' + '<small>'+ user +'</small>' + ' ' + '<small>'+date+'</small></p>' +
                                '<p>'+ text +'</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }
    setTimeout(
        function(){
            $(".listMess").append(control).scrollTop($(".listMess").prop('scrollHeight'));
        });
}
var id_chat;

//Функция для очищения чата
function resetChat(){
    $(".listMess").empty();
}

//Запрос на отображение всех сообщений из базы данных.
function ShowMessages(idd){
    resetChat()
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/get_messages/', true);
    data = {
        id: idd,
    }
    id_chat = idd;
    data = JSON.stringify(data);
    xhr.onload = function(e){
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    }
    else{
       var data = JSON.parse(xhr.responseText);
       if (data.name_chat != ""){
            var t = data.name_chat;
            $(".takeNameChat").val(t)
       }
       if (data.messages != ""){
            for (var idx = 0; idx < data.messages.length; idx++ ){
                 if (data.messages[idx].my == "True"){
                        insertChat("me", data.messages[idx].text, data.messages[idx].user);
                    }
                    else{
                        insertChat("you", data.messages[idx].text, data.messages[idx].user);
                    }
                }
            }
       }
    }
    xhr.send(data);
}

//Обработчик для добавления сообщения в чат по кнопке "Enter"
$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        SendMessage(text)
        $('.mytext').val('');
    }
});

//Функция запрос для отправления сообщения в определенный чат
function SendMessage(mytxt) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/add_message/', true);
    data = {
        text: mytxt,
        id: id_chat
    }
    data = JSON.stringify(data);
    xhr.onload = function(e){
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        var data = JSON.parse(xhr.responseText);
        if (data.messages != ""){
            $('.mytext').val('');
        }
      }
    }
    xhr.send(data);
}

//Лонг-пулл запрос на отображение последних сообщений.
function ShowLastMessage(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/get_unchecked_messages/', true);
    data = {
        id: 1,
    }
    data = JSON.stringify(data);
    xhr.timeout = 60 * 1000
    xhr.ontimeout = function (){
        ShowLastMessage();
    }
    xhr.onload = function(e){
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        var data = JSON.parse(xhr.responseText);
        if(data.message == "ch ne vibran"){
            console.log('чат не выбран!')
        }
        else{
            for (var idx = 0; idx < data.messages.length; idx++ ){
                if (data.messages[idx].my == "True"){
                    insertChat("me", data.messages[idx].text, data.messages[idx].user);
                }
                else{
                    insertChat("you", data.messages[idx].text, data.messages[idx].user);
                }
            }
        }
        setTimeout(ShowLastMessage,0);
      }
    }
    xhr.onerror = function(e){
       setTimeout(ShowLastMessage, 60 * 1000);
    }
    xhr.send(data);
}

//Функци запрос для выхода из системы
function logOut(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/sign_out/', true);
    data = {"":""}
    data = JSON.stringify(data);
    xhr.onload = function(e){
        if (xhr.status != 200) {
          console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
        } else {
          console.log( xhr.responseText );
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          if (data != ""){
              document.location.href = "http://127.0.0.1:8000/sign_in";
          }
        }
    }
    xhr.send(data)
}