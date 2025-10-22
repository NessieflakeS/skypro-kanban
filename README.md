# Skypro Kanban - Управление задачами

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.19-pink)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

Современное веб-приложение для управления задачами по методологии Kanban.

## 🚀 Особенности

- **Управление задачами** - создание, редактирование, удаление
- **Kanban доска** - визуальное представление workflow  
- **Аутентификация** - регистрация и вход
- **Темная/светлая тема** - адаптация под предпочтения
- **Drag & Drop** - интуитивное перемещение задач
- **Оптимистичные обновления** - мгновенный отклик интерфейса

## 🛠 Технологии

- **Frontend:** React 19, React Router DOM
- **Стилизация:** Styled Components
- **Сборка:** Vite
- **State Management:** Context API

## 📦 Быстрый старт

```bash
# Установка и запуск
git clone [repository-url]
cd skypro-kanban
npm install
npm run dev


Скрипты

npm run dev          # Development сервер
npm run build        # Production сборка
npm run lint         # Проверка кода
npm run preview      # Просмотр сборки


🏗 Архитектура

src/
├── components/     # Переиспользуемые компоненты
├── context/        # React Contexts
├── pages/          # Страницы приложения
├── api.js          # API взаимодействие
└── App.jsx         # Корневой компонент


🔐 Аутентификация

Используется JWT-токены. Тестовые данные:

Логин: admin

Пароль: admin


📊 Контексты

AuthContext
Управление состоянием аутентификации

Логин/регистрация/выход

Сохранение сессии

TaskContext
Загрузка и кэширование задач

Оптимистичные обновления UI

Drag & Drop операции


🎨 Темы

Поддерживаются светлая и темная темы с плавными переходами.


🔄 API

Все API вызовы централизованы в api.js:
// Работа с задачами
const tasks = await tasksAPI.getTasks();
const newTask = await tasksAPI.createTask(taskData);

// Аутентификация  
const user = await authAPI.login(credentials);


🚀 Производительность

Оптимистичные обновления - UI обновляется мгновенно

Локальное состояние - минимизация запросов к серверу

Скелетоны - индикаторы загрузки


Примечание: Для работы приложения необходим бэкенд API по адресу https://wedev-api.sky.pro/api