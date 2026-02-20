import React, { useState } from 'react';

const Register = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Введите имя';
    if (!form.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!form.password) {
      newErrors.password = 'Введите пароль';
    } else if (form.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }
    if (!form.confirm) {
      newErrors.confirm = 'Подтвердите пароль';
    } else if (form.password !== form.confirm) {
      newErrors.confirm = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      if (users.some(u => u.email === form.email)) {
        alert('Email уже зарегистрирован');
        setLoading(false);
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        password: form.password,
        isAdmin: false
      };
      
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      alert('Регистрация успешна!');
      navigate('login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div>
        <h2>Регистрация</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              disabled={loading}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              disabled={loading}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          
          <div>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••"
              disabled={loading}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          
          <div>
            <label>Подтверждение пароля</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••"
              disabled={loading}
            />
            {errors.confirm && <span>{errors.confirm}</span>}
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? '⏳ Регистрация...' : 'Зарегистрироваться'}
          </button>
          
          <div>
            <span>Уже есть аккаунт? </span>
            <button type="button" onClick={() => navigate('login')}>
              Войти
            </button>
          </div>
          
          <div>
            <p>📋 Требования:</p>
            <ul>
              <li>Минимум 6 символов</li>
              <li>Пароли должны совпадать</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;