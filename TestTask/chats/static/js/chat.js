//Функция добавления чата в список чатов.
function insertListChat(id, nameChat, lastMess_text, lastMess_status, lastMess_userName){
    var control = "";

    if (lastMess_status == "unchecked"){
        control =
                  '<span  onclick="ShowMessages()" style="cursor: pointer; color: black">' +
                  '<li style="background:whitesmoke; border-bottom: 1px solid #ccc;">' +
                        '<div style="word-wrap:break-word; padding: 15px 0 15px 15px;">' +
                                '<p style="margin: 0; padding: 0">' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                                '<p style="margin: 0; padding: 0">' + '<small >' + lastMess_userName + ': </small>' + '<small>'  + lastMess_text + '</small>'+ '</p>' +
                        '</div>' +
                  '</li>'+
                  '</span>';

    }else{
        control =
                  '<span  onclick="ShowMessages()" style="cursor: pointer; color: black">' +
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

//-- NOTE: No use time on insertChat.
function AddChat(nameChat) {
    var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_add_chat/', true);

      // 3. Отсылаем запрос
      data = {
        name: nameChat,
      }
      data = JSON.stringify(data);

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
            console.log( xhr.responseText ); // responseText -- текст ответа.
            var data = JSON.parse(xhr.responseText);
            insertListChat(3, nameChat)
            console.log(data);
            //if() alert('wrong!')
            //if() alert('wrong!')
            //if() alert('wrong!')
          }
      }
      xhr.send(data);
}
// Запрос на получение чатов из базы данных
function getListChats(){
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://127.0.0.1:8000/GET_chats/', true);

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
                var data = JSON.parse(xhr.responseText);
                if (data.chats != ""){
                    for (var idx = 0; idx < data.chats.length; idx++ ){
                        console.log( data.chats[idx].last_message_user)
                        insertListChat(2, data.chats[idx].name, data.chats[idx].last_message_text, data.chats[idx].last_message_status, data.chats[idx].last_message_user, );
                    }
                }
            }
          }
      xhr.send();
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

//Функция добавления чата в список чатов.
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

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);
            $(this).val('');
        }
    }
});

$('.lol').click(function(){
    var text = $('.mytext').val();
        if (text !== ""){
            insertChat("me", text);
            $('.mytext').val('');
        }
})

//-- Clear Chat
resetChat();

////-- Print Messages
//insertChat("me", "Hello Tom...");
//insertChat("you", "Hi, Pablo");
//insertChat("me", "What would you like to talk about today?");
//insertChat("you", "Tell me a joke");
//insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!");
//insertChat("you", "LOL");

//Лонг-пулл запрос на отображение последних сообщений.
function ShowLastMessage(){
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://127.0.0.1:8000/GET_unchecked_messages/', true);

      xhr.timeout = 60 * 1000

      xhr.ontimeout = function (){
        ShowLastMessage();
      }

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
                console.log( xhr.responseText ); // responseText -- текст ответа.
                var data = JSON.parse(xhr.responseText);
                if (data.messages != ""){
                    for (var idx = 0; idx < data.messages.length; idx++ ){
                        if (data.messages[idx].my == "True"){
                            insertChat("me", data.messages[idx].text, user);
                        }
                        else{
                            insertChat("you", data.messages[idx].text, user);
                        }
                    }
                }
            }
          }
          console.log(data);
          xhr.onerror = function(e){
               setTimeout(load_new_messages, 60 * 1000);
          }
          xhr.send();
}

//Запрос на отображение всех сообщений из базы данных.
function ShowMessages(){
      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://127.0.0.1:8000/get_messages/', true);

      data = {
        id: 2,
      }
      data = JSON.stringify(data);

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
                console.log( xhr.responseText ); // responseText -- текст ответа.
                var data = JSON.parse(xhr.responseText);
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

function SendMessage(mytxt) {
    if (mytxt == 'kek') alert('lol');

    var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_send_mess/', true);

      // 3. Отсылаем запрос
      data = {
        text: mytxt,
      }
      data = JSON.stringify(data);

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
            console.log( xhr.responseText ); // responseText -- текст ответа.
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            //if() alert('wrong!')
            //if() alert('wrong!')
            //if() alert('wrong!')
          }
      }
      xhr.send(data);
}


