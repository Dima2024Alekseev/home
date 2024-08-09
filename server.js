const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
const PORT = 5000;
const myCache = new NodeCache({ stdTTL: 300 }); // Кэширование данных на 5 минут

const ACCESS_TOKEN = 'vk1.a.JRi3rpmUhtiZ8X3cPmNGdiwy3C7xhbHSI76u110imU2VsgD99A-C1bkAtC5Xs1V9-KAn-armltwY4qcc8crO-5YXZIKwBpskmG9kjV7iBLMRwXC_lRCTH9tToNVo81AdDgPC839c3W6pZKvh1MIF_Uff-G88i_TISVdZbDHzRa-FKpgoWx6v2G1o4SWXS0nhI7UHFyXyX0K8rFkaCNh4JA';
const GROUP_ID = '216523190';

app.use(cors());

app.get('/api/posts', async (req, res) => {
  try {
    const cacheKey = 'vk_posts';
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`https://api.vk.com/method/wall.get`, {
      params: {
        owner_id: `-${GROUP_ID}`,
        count: 10, // Количество постов для получения
        access_token: ACCESS_TOKEN,
        v: '5.131'
      }
    });

    const posts = response.data.response.items;
    const postsWithPhotos = await Promise.all(posts.map(async post => {
      if (post.attachments) {
        const photoAttachments = post.attachments.filter(attachment => attachment.type === 'photo');
        const photoUrls = photoAttachments.map(photo => photo.photo.sizes.pop().url);
        return { ...post, photoUrls };
      }
      return post;
    }));

    myCache.set(cacheKey, postsWithPhotos);
    res.json(postsWithPhotos);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});