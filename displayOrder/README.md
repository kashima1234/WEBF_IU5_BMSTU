# Лабораторная 6
Цель работы: Внедрение адаптивности и развертывание приложения
Порядок показа: Открыть GitHub Pages с mock на телефоне, сохранить PWA. Открыть PWA, применить фильтрацию услуг, перейти на главную и вернуться, чтобы показать старое значение фильтра. Перейти в адаптивный режим браузера, поменять ширину. Объяснить настройки для размера карточек, количества колонок и тд - показать конкретные значения размера и количества колонок, карточек. На компьютере показать подключение Tauri к бэкенду по IP локальной сети (не localhost), сравнить IP сервера из консоли и в коде приложения. Отредактировать услуги в БД и продемонстрировать изменение в Tauri.
Контрольные вопросы: flux, схема redux (store, reducer, dispatch, action), PWA, Tauri, Pages
Deployment диаграмма все узлы и компоненты системы: фронтенда, web-сервера со статикой, веб-сервиса, базы данных и других хранилищ и тд. Узлы соединить протоколами, компоненты фронтенда и бэкенда поместить в узлах, указать API между ними.
Задание: Внедрить менеджер состояний для хранения значений фильтров, добавление адаптивности и PWA, создание Tauri и развертывание в Pages
Добавление менеджера состояний Redux Toolkit для хранения фильтра услуг. Необходимо развернуть фронтенд на GitHub Pages и добавить возможность работы в режиме PWA. Добавить адаптивность для трех страниц приложения.
Создание простого нативного приложения на Tauri для интерфейса гостя (без авторизации и редактирования), состоящий из 3 страниц с фильтрацией и картинками. Подключить приложение к разработанному API через IP адрес в локальной сети (не localhost).



# display Order

**Deployment in github** 

![git](Resources/1.png)


**Pages with installation for PWA**

![pages](Resources/2.png)

**Uncle PWA**

![pwa](Resources/3.png)
![pwa](Resources/4.png)
![pwa](Resources/5.png)

**From the phone wassup nigga)** 

![phone](Resources/f1.png)
![phone](Resources/f2.png)
![phone](Resources/f3.png)


# http://localhost:3000 


![3000](Resources/6.png)
![3000](Resources/7.png)


# Tauri uncle
<code>npm run tauri dev</code>
![Tauri](Resources/8.png)
![Tauri](Resources/9.png)
![Tauri](Resources/10.png)


![git](Resources/git.png)

диаграмму развертывания

![er](Resources/er.png)
## ;)