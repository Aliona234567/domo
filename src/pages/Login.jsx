import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import './Login.css';

const Login = ({ navigate }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Введите логин';
    if (!form.password.trim()) newErrors.password = 'Введите пароль';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => 
        (u.username === form.username || u.email === form.username) && 
        u.password === form.password
      );
      
      if (user) {
        const { password, ...userData } = user;
        dispatch(setCredentials({ user: userData, token: 'token-' + Date.now() }));
        alert(`Добро пожаловать, ${user.name}!`);
        navigate('home');
      } else {
        alert('Неверный логин или пароль');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <div style={{ width: 400, padding: 30, background: '#f9f9f9', borderRadius: 10 }}>
        <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Вход</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Логин или email</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin@example.com"
              style={{ 
                width: '100%', 
                padding: 10,
                border: errors.username ? '1px solid red' : '1px solid #ddd',
                borderRadius: 5
              }}
              disabled={loading}
            />
            {errors.username && (
              <span style={{ color: 'red', fontSize: 14 }}>{errors.username}</span>
            )}
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Пароль</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••"
              style={{ 
                width: '100%', 
                padding: 10,
                border: errors.password ? '1px solid red' : '1px solid #ddd',
                borderRadius: 5
              }}
              disabled={loading}
            />
            {errors.password && (
              <span style={{ color: 'red', fontSize: 14 }}>{errors.password}</span>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 12,
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              marginBottom: 15
            }}
          >
            {loading ? '⏳ Вход...' : 'Войти'}
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span>Нет аккаунта? </span>
            <button 
              type="button"
              onClick={() => navigate('register')}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
            >
              Зарегистрироваться
            </button>
          </div>
          
          {/* Тестовые данные */}
          <div style={{ padding: 15, background: '#fff', borderRadius: 5, fontSize: 14 }}>
            <p style={{ marginBottom: 10 }}>📝 Тестовые данные:</p>
            <div style={{ marginBottom: 5 }}>👑 admin / 1234 (админ)</div>
            <div>🧑 user / user (пользователь)</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;