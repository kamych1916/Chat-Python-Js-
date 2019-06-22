function regist(mail, log, pass1, pass2) {
    if(pass1 != pass2) alert('пороли не совпадают!');
    else{
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_sign_up/', true);

      // 3. Отсылаем запрос
      data = {
        email: mail,
        login: log,
        password: pass1,
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
          }
      }
      xhr.send(data);
    }
}