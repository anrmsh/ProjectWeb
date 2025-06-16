const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'messages.json');

// Middleware
//позволяет серверу обрабатывать данные форм (POST).
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

//отправляет клиенту 9lab.html.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '9lab.html'));
});

// const INDEX_HTML_PATH = path.join(__dirname, 'index.html');
// app.get('/', (req, res) => {
//     res.sendFile(INDEX_HTML_PATH);
// });

// Обработка формы
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Проверка
    if (!name || !email || !message) {
        return res.status(400).send('Все поля должны быть заполнены.');
    }

    // Чтение текущих отзывов
    let messages = [];
    if (fs.existsSync(DATA_FILE)) {
        messages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }

    // добавить новый отзыв
    messages.push({
        name,
        email,
        message,
        date: formatDate(new Date())
    });



    // записываем в файл
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    //res.send('Отзыв успешно отправлен! <a href="/">Назад</a>');
    res.send(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="9style.css">
    <title>Успех</title>
</head>
<body>
    <div class="modal">
        <h2>Спасибо за Ваш отзыв!</h2>
        <a href="/" class = "butHref">Назад</a>
    </div>
</body>
</html>
`);

});

// Страница со всеми отзывами
app.get('/messages', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        return res.send('Сообщений пока нет.');
    }

    const messages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Отзывы</title>
 <link rel="stylesheet" href="/9style.css">
</head>
<body>
  <h1>Отзывы покупателей</h1>
  <ul>
`;

    for (const msg of messages) {
        html += `
    <li><strong>${msg.name}</strong> (${msg.email})<br>
    ${msg.message}<br><small>${msg.date}</small></li><hr>
  `;
    }

    html += `
  </ul>
  <a href="/" class="butHref">Назад к форме</a>
</body>
</html>
`;

    res.send(html);
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



function formatDate(date) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}
