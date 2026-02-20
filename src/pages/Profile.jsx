import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Profile.css';

const Profile = ({ navigate }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('home');
  };

  if (!user) return null;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr', 
        gap: 20,
        maxWidth: 1000,
        margin: '0 auto'
      }}>
        {/* Левая колонка - аватар и действия */}
        <div style={{ 
          background: '#f9f9f9', 
          padding: 20, 
          borderRadius: 10,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 80, marginBottom: 10 }}>👤</div>
          <h2>{user.name}</h2>
          <p style={{ color: user.isAdmin ? '#f39c12' : '#666' }}>
            {user.isAdmin ? '👑 Администратор' : '🧑 Пользователь'}
          </p>
          
          <hr style={{ margin: '20px 0' }} />
          
          <button 
            onClick={() => navigate('cart')}
            style={{
              width: '100%',
              padding: 10,
              marginBottom: 10,
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            Корзина ({totalQuantity} {totalQuantity === 1 ? 'товар' : 'товаров'})
          </button>
          
          {user.isAdmin && (
            <button 
              onClick={() => navigate('admin')}
              style={{
                width: '100%',
                padding: 10,
                marginBottom: 10,
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer'
              }}
            >
              Админ панель
            </button>
          )}
          
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: 10,
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>

        {/* Правая колонка - информация */}
        <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 10 }}>
          <h3 style={{ marginBottom: 20 }}>Информация о профиле</h3>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ color: '#666', marginBottom: 5 }}>👤 Имя пользователя</div>
            <div>{user.username || user.name}</div>
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ color: '#666', marginBottom: 5 }}>✉️ Email</div>
            <div>{user.email}</div>
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ color: '#666', marginBottom: 5 }}>👑 Роль</div>
            <div>{user.isAdmin ? 'Администратор' : 'Пользователь'}</div>
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ color: '#666', marginBottom: 5 }}>🆔 ID</div>
            <div>#{user.id}</div>
          </div>

          {/* Быстрые действия для админа */}
          {user.isAdmin && (
            <>
              <hr style={{ margin: '20px 0' }} />
              <h4 style={{ marginBottom: 15 }}>Быстрые действия</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button 
                  onClick={() => navigate('admin-products')}
                  style={{
                    padding: 10,
                    background: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer'
                  }}
                >
                  📦 Товары
                </button>
                <button 
                  onClick={() => navigate('admin-orders')}
                  style={{
                    padding: 10,
                    background: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer'
                  }}
                >
                  📋 Заказы
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;