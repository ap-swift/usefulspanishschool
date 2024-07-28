const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000; // Убедитесь, что PORT используется правильно

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Настройка базы данных
const pool = new Pool({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'mydatabase',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

// Создание таблицы, если она не существует
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        contact VARCHAR(255) NOT NULL
      );
    `);
    console.log("Table 'contacts' is ready.");
  } catch (error) {
    console.error('Error creating table:', error);
  }
})();

// Настройка почтового сервиса
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465, // или 587, если используете TLS
  secure: true, // true для 465, false для 587
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email@gmail.com',
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  const { contact } = req.body;
  try {
    // Сохранение в базу данных
    await pool.query('INSERT INTO contacts (contact) VALUES ($1)', [contact]);

    // Отправка email уведомления
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_USER || 'your-email@gmail.com',
      subject: 'Новая заявка',
      text: `Получена новая заявка: ${contact}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Контакт успешно сохранен и уведомление отправлено.');
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error); // Вывод в логи
    res.status(500).send(`Произошла ошибка: ${error.message}`); // Передача сообщения об ошибке
  }
});
