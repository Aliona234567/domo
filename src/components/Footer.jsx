import React from 'react';
import './AppFooter.css';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div>
          <h3 className="footer-title">О нас</h3>
          <p className="footer-text">
            Мы предлагаем лучшие товары по лучшим ценам. Наша миссия - сделать покупки удобными и приятными.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Контакты</h3>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
               +7 (999) 123-45-67
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span> info@reactshop.ru
            </div>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Информация</h3>
          <div className="footer-info-links">
            <div className="footer-info-item">Доставка</div>
            <div className="footer-info-item">Оплата</div>
            <div className="footer-info-item">Гарантия</div>
            <div className="footer-info-item">Возврат</div>
          </div>
        </div>

        
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024 React Shop. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;