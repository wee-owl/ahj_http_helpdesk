# [HelpDesk](https://wee-owl.github.io/ahj_http_helpdesk)  

[![Build status](https://ci.appveyor.com/api/projects/status/i7lotuctinx3f8hf?svg=true)](https://ci.appveyor.com/project/wee-owl/help-desk)  

HelpDesk - это задание [Нетологии](https://netology.ru/) по созданию сервиса управления заявками на помощь.  
Возможности приложения: добавление тикетов через модальное окно, редактирование созданных тикетов, удаление тикета с подтверждением действия, просмотр деталей тикета при нажатии на "тело" тикета.  

<img src="https://github.com/wee-owl/ahj_http_helpdesk/assets/95621680/c326ff3c-54d6-4eff-85bd-352c01abe393" width="500" height="">  

## Технологии  
- JavaScript
- HTML
- CSS
- Webpack
- Webpack loaders

[Сервер](https://github.com/wee-owl/ahj_http_helpdesk-backend) расположен на [glitch.com](https://glitch.com/)  

## Реализованная функциональность
- список тикетов загружается с сервера в формате JSON
- модальное окно добавления нового тикета вызывается по кнопке "Добавить тикет" в правом верхнем углу
- модальное окно редактирования существующего тикета вызвается по кнопке с иконкой "✎" (карандашик)
- модальное окно подтверждения удаления вызывается по кнопке с иконкой "x" (крестик)
- для просмотра деталей тикета нужно нажать на "тело" тикета
- запросы на сервер через `GET` и `POST`
- получение данных с сервера через `fetch API`
