var me = {};

var you = {};

function insertListChat(nameChat, lastMess_text, lastMess_status, lastMess_userName){
    var control = "";

    if (lastMess_status == "не прочитано"){
        control =
                  '<a href="" style="outline: none; text-decoration: none; color: black">' +
                  '<li style="background:whitesmoke;">' +
                        '<div style="word-wrap:break-word;  margin-top:10px; padding: 0 0 0px 15px;">' +
                                '<p>' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                                '<p>' + '<small >' + lastMess_userName + ': </small>' + '<small>'  + lastMess_text + '</small>'+ '</p>' +
                        '</div>' +
                  '</li>'+
                  '</a>';

    }else{
        control =
                  '<a href="" style="outline: none; text-decoration: none; color: black">' +
                      '<li style="background:white;">' +
                            '<div style="word-wrap:break-word;  margin-top:10px; padding: 0 0 0px 15px;">' +
                                    '<p>' + '<small style="font-weight: bold">'  + nameChat + '</small>'+'</p>' +
                                    '<p>' + '<small >' + lastMess_userName + ': </small>' + '<small>'  + lastMess_text + '</small>'+ '</p>' +
                            '</div>' +
                      '</li>'+
                  '</a>';
    }

    setTimeout(
        function(){
            $(".listChats").append(control);
        });
}

function getListChats(){
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'http://127.0.0.1:8000/get_chats/', true);


      xhr.onload = function(e){
          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
                console.log( xhr.responseText ); // responseText -- текст ответа.
                var data = JSON.parse(xhr.responseText);
                if (data.chats != ""){
                    for (var idx = 0; idx < data.chats.length; idx++ ){
                        insertListChat(data.name, data.last_message_status, data.last_message_user, data.last_message_user);
                    }
                }
            }
          }
          console.log(data);
          xhr.send();
}

//insertListChat("Пидоры", "пошли нахуй", "не прочитано", "Никита" );
//insertListChat("Хуесосы", "kek", "прочитано", "Паша");
//insertListChat("Гондоны", "lol", "не прочитано", "Дима");
//insertListChat("Жопа", "lmao", "не прочитано", "Влад");
//insertListChat("Шлюхи", "fuck", "прочитано", "Илья");
//insertListChat("Суки", "suck", "не прочитано", "Никита");
//insertListChat("Гондоны", "lol", "не прочитано", "Дима");
//insertListChat("Жопа", "lmao", "не прочитано", "Влад");
//insertListChat("Шлюхи", "fuck", "прочитано", "Илья");
//insertListChat("Суки", "suck", "не прочитано", "Никита");


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

//-- No use time. It is a javaScript effect.
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
            $(".listMess").append(control).scrollTop($("ul").prop('scrollHeight'));
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

//-- Print Messages
insertChat("me", "Hello Tom...");
insertChat("you", "Hi, Pablo");
insertChat("me", "What would you like to talk about today?");
insertChat("you", "Tell me a joke");
insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!");
insertChat("you", "LOL");

function ShowLastMessage(){
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'http://127.0.0.1:8000/GET_unchecked_messages/', true);

      // 3. Отсылаем запрос
      xhr.timeout = 60 * 1000

      xhr.ontimeout = function (){
        load_new_messages();
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

function ShowMessages(){
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'http://127.0.0.1:8000/GET_messages/', true);

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
            xhr.send();
      }
function SendMessage(mytxt) {
    if (mytxt == 'kek') alert('lol');

    var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_send_mess/', true);

      // 3. Отсылаем запрос
      data = {
        text: mytxt,
        chat: pass,
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


//-- NOTE: No use time on insertChat.