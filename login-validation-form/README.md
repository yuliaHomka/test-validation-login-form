Форма отправки логина.

При нажатиина кнопку "Отправить" происходит проверка логина, введенного выше. Если галочка "Получать рандомные ответы" не проставлена, отправляется запрос на сервер, иначе результат валидации генерится случайным образом.
На сервере 5 корректных логинов ('admin, mvideo', 'dev', 'user', '123'), остальные считаются некорректными. 
Если логин после проверки оказывается корректным, он выводится в форму. В противном случае на 5 секунд выводится ошибка. 
Отправлять на проверку данные можно не чаще раза в минуту (пустое значение не отправляется).
После отправки логина под кнопкой "Отправить" поялвляеся таймер, сколько секунд еще кнопка будет некликабельна.

Команда `npm start` (внутри папки `login-validation-form`) запускает выполнение `ng serve & node ../server/server.js`

# LoginValidationForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
