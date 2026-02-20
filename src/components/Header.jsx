import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import './AppHeader.css';

const AppHeader = ({ navigate }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('home');
    setMenuOpen(false);
  };



  const handleNavigation = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="app-header">
      {/* Логотип и навигация */}
      <div className="header-left">
        <div onClick={() => handleNavigation('home')} className="header-logo">
          Shop
        </div>
        
        <nav className="header-nav">
          <div 
            
            onClick={() => handleNavigation('home')}
          >
            Главная
          </div>
          
          <div 
            
            onClick={() => handleNavigation('products')}
          >
            Товары
          </div>
        </nav>
      </div>

      {/* Правая часть */}
      <div className="header-right">
        {/* Корзина */}
        <div className="header-cart" onClick={() => handleNavigation('cart')}>
          Корзина
         
        </div>

        {/* Пользователь */}
        {isAuthenticated ? (
          <div className="header-user" >
            <div 
              className="header-user-info"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {user?.name || 'Пользователь'}
            </div>
            
            {menuOpen && (
              <div className="header-dropdown">
                {user?.isAdmin && (
                  <>
                    <div onClick={() => handleNavigation('admin')}>
                      Админ панель
                    </div>
                    <div onClick={() => handleNavigation('admin-products')}>
                      Управление товарами
                    </div>
                    <div onClick={() => handleNavigation('admin-orders')}>
                      Управление заказами
                    </div>
                    <div className="header-divider" />
                  </>
                )}
                <div onClick={() => handleNavigation('profile')}>
                  Профиль
                </div>
                <div onClick={handleLogout}>
                  Выйти
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="header-login-btn"
            onClick={() => navigate('login')}
          >
            Войти
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;