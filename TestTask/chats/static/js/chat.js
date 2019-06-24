//Функция добавления чата в список чатов.
function insertListChat(idd, nameChat, lastMess_text, lastMess_status, lastMess_userName){

    var control = "";
    if (lastMess_status == "unchecked"){
        control =
                  '<span onclick="giveIdChat('+idd+')" style="cursor: pointer; color: black">' +
                  '<li style="background:whitesmoke; border-bottom: 1px solid #ccc;">' +
                        '<div style="word-wrap:break-word; padding: 15px 0 15px 15px;">' +
                                '<p style="margin: 0; padding: 0">' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                        '</div>' +
                  '</li>'+
                  '</span>';
    }else{
        control =
//                  '<input type="text" class="takeNameChat" value="'+ nameChat +'" style="background: white; border: 0" disabled>' +
                  '<span onclick="giveIdChat('+idd+')" style="cursor: pointer; color: black">' +
                      '<li style="background:white; border-bottom: 1px solid #ccc;">' +
                            '<div style="word-wrap:break-word; padding: 15px 0 15px 15px;">' +
                                    '<p style="margin: 0; padding: 0">' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                            '</div>' +
                      '</li>'+
                  '</span>';
    }

    setTimeout(
        function(){
            $(".listChats").append(control).scrollTop($(".listChat").prop('scrollHeight'));;
        });
}
//var nC;
//console.log("d", nC)
function giveIdChat(idd){
    var xhr = new XMLHttpRequest();

          // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
          xhr.open('POST', 'http://127.0.0.1:8000/add_num_chat/', true);
          data = {
            id: idd
          }
          data = JSON.stringify(data);

          xhr.onload = function(e){
              // 4. Если код ответа сервера не 200, то это ошибка
              if (xhr.status != 200) {
                // обработать ошибку
                console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
              } else {
                var data = JSON.parse(xhr.responseText);
                if (data.message != ""){
                    console.log('all right')
                }
              }
          }
          xhr.send(data);
          location.reload();
//          nC =  $(".takeNameChat").val()
//          console.log(nC);
}

// Запрос на получение чатов из базы данных
function getListChats(){
//      console.log(nC)
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/GET_chats/', true);

      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
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
                        console.log("last_message_status: ",data.chats[idx].last_message_status)
                    }
                    id_chat = data.chats[0].id;
                    ShowMessages(id_chat);
                    ShowLastMessage();

                }
            }
          }
      xhr.send();
}

function AddChat(nameChat) {
    var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_add_chat/', true);
      alert(nameChat)
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
          }
      }
      xhr.send(data);
}

function AddUserChat(loginUser) {
    var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/add_user_to_chat/', true);
      // 3. Отсылаем запрос

      data = {
        login: loginUser,
        chat_id: id_chat,
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
            if(data.message == "error"){
                alert('error')
            }
            else if (data.message == "user already in chat"){
                alert('user already in chat')
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

//function resetChat(){
//    $(".listMess").empty();
//}


////-- Clear Chat
//resetChat();

////-- Print Messages
//insertChat("me", "Hello Tom...");
//insertChat("you", "Hi, Pablo");
//insertChat("me", "What would you like to talk about today?");
//insertChat("you", "Tell me a joke");
//insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!");
//insertChat("you", "LOL");

//Запрос на отображение всех сообщений из базы данных.

var id_chat;

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
          // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      }
      else{
            // вывести результат
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
                 //setTimeout(ShowLastMessage,0);
           }
      }
      xhr.send(data);
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        SendMessage(text)
        $('.mytext').val('');
    }
});

function SendMessage(mytxt) {
          var xhr = new XMLHttpRequest();

          // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
          xhr.open('POST', 'http://127.0.0.1:8000/add_message/', true);

          data = {
            text: mytxt,
            id: id_chat
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
            id: 1
      }
          data = JSON.stringify(data);

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
                if(data.message == "ch ne vibran"){
                    console.log('ShowLastMessage')
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

function logOut(){

    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос
    xhr.open('GET', 'http://127.0.0.1:8000/sign_out/', true);
    data = {"":""}

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
          if (data != ""){
              document.location.href = "http://127.0.0.1:8000/sign_in";
          }
        }
    }
    xhr.send(data)
}