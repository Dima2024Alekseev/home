import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useNotification } from '../Components/NotificationContext'; // Импортируем контекст уведомлений
import "../styles/profile.css";
import Header from "../Components/Header";
import Form from "../Components/Form";
import Footer from "../Components/Footer/Footer";

const Authorization = () => {
  const [error, setError] = useState(null);
  const { showNotification } = useNotification(); // Используем контекст уведомлений
  const navigate = useNavigate(); // Используем useNavigate для перенаправления

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Сохранение токена в localStorage
      localStorage.setItem('isAuthenticated', 'true');
      showNotification('Успешный вход!', 'success'); // Отображение уведомления
      navigate('/admin-dashboard'); // Перенаправление на страницу администратора
    } catch (error) {
      setError(error.response?.data?.error || '');
      showNotification('Ошибка авторизации', 'error'); // Отображение уведомления об ошибке
    }
  };

  return (
    <div id="inner">
      <Header title='Авторизация аккаунта' />
      <main>
        <Form
          showFields={{ login: true, password: true }}
          formTitle='Авторизация'
          title_button='Войти'
          onSubmit={handleSubmit}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default Authorization;
