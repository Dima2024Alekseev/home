const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = 5000;
const myCache = new NodeCache({ stdTTL: 300 }); // Кэширование данных на 5 минут

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const GROUP_ID = process.env.GROUP_ID;
const FILE_PATH = path.join(__dirname, 'src', 'data', 'posts.json'); // Путь к файлу для сохранения постов
const db = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Подключение к базе данных MongoDB
mongoose
  .connect(db)
  .then(async () => {
    console.log('Соединенние с БД установленно');

    // Проверка наличия администратора в базе данных
    const adminExists = await Admin.findOne({ login: ADMIN_LOGIN });
    if (!adminExists) {
      const newAdmin = new Admin({
        login: ADMIN_LOGIN,
        password: ADMIN_PASSWORD // Пароль будет хеширован перед сохранением
      });
      await newAdmin.save();
      console.log('Администратор создан');
    }
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

// Модель для постов
const postSchema = new mongoose.Schema({
  id: Number,
  text: String,
  photoUrls: [String]
});
const Post = mongoose.model('Post', postSchema);

// Модель для администратора
const adminSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

// Фильтр для удаления ссылок вида [id... из текста
const removeLinksFromText = (text) => {
  if (!text) return text;
  return text.replace(/\[id\d+\|([^\]]+)\]/g, '$1');
};

// Маршрут для получения постов
app.get('/api/posts', async (req, res) => {
  try {
    const cacheKey = 'vk_posts';
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const posts = await Post.find({});
    const postsJSON = posts.map(post => post.toObject()); // Преобразование объектов Mongoose в простые объекты JavaScript

    // Фильтрация постов, которые содержат фотографии больше одной фотографии и ссылки в тексте типа club
    const filteredPosts = postsJSON.filter(post => {
      return post.photoUrls && post.photoUrls.length > 0 && post.text && !/\[club\d+\|/.test(post.text);
    });

    myCache.set(cacheKey, filteredPosts);
    res.json(filteredPosts);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

// Функция для периодической проверки новых новостей
const checkForNewPosts = async () => {
  try {
    const response = await axios.get(`https://api.vk.com/method/wall.get`, {
      params: {
        owner_id: `-${GROUP_ID}`,
        count: 100, // Количество постов для получения
        access_token: ACCESS_TOKEN,
        v: '5.131'
      }
    });

    const posts = response.data.response.items;
    const postsWithPhotos = await Promise.all(posts.map(async post => {
      const textWithoutLinks = removeLinksFromText(post.text);
      if (post.attachments) {
        const photoAttachments = post.attachments.filter(attachment => attachment.type === 'photo');
        const photoUrls = photoAttachments.map(photo => photo.photo.sizes.pop().url);
        return { ...post, text: textWithoutLinks, photoUrls };
      }
      return { ...post, text: textWithoutLinks };
    }));

    // Обновление или вставка данных в MongoDB
    const bulkOps = postsWithPhotos.map(post => ({
      updateOne: {
        filter: { id: post.id },
        update: post,
        upsert: true
      }
    }));

    await Post.bulkWrite(bulkOps);

    // Фильтрация постов исключающая посты с видео
    const filteredPosts = postsWithPhotos.filter(post => {
      return !post.attachments || !post.attachments.some(attachment => attachment.type === 'video');
    });

    const firstFivePosts = filteredPosts.slice(0, 6);

    // Запись данных в файл для главной странице в новостном блоке(временное хранилище)
    fs.writeFileSync(FILE_PATH, JSON.stringify(firstFivePosts, null, 2));

    myCache.set('vk_posts', postsWithPhotos); // Кэширование данных
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

// Запуск периодической проверки новых новостей каждые 30 секунд
setInterval(checkForNewPosts, 30000);

// Маршрут для авторизации администратора
app.post('/api/admin/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const admin = await Admin.findOne({ login });
    if (!admin) {
      return res.status(401).json({ error: 'Неверный login или пароль' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный login или пароль' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
