function auth(log, pass) {
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('POST', 'http://127.0.0.1:8000/POST_sign_in/', true);

      // 3. Отсылаем запрос
      data = {
        login: log,
        password: pass,
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