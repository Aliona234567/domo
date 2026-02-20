import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = ({ navigate }) => {
  const products = useSelector((state) => state.products?.products || []);
  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ padding: 20 }}>
      {/* Герой-секция */}
      <div style={{ 
        textAlign: 'center', 
        padding: '50px 20px',
        background: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 40
      }}>
        <h1>Добро пожаловать в React Shop</h1>
        <p style={{ fontSize: 18, marginBottom: 20 }}>Лучшие товары по лучшим ценам</p>
        <button 
          onClick={() => navigate('products')}
          style={{
            padding: '10px 30px',
            fontSize: 16,
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Начать покупки →
        </button>
      </div>

      {/* Преимущества */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 20,
        marginBottom: 40
      }}>
        <div style={{ textAlign: 'center', padding: 20, background: '#f9f9f9', borderRadius: 10 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🚚</div>
          <h3>Бесплатная доставка</h3>
          <p>При заказе от 3000₽</p>
        </div>
        
        <div style={{ textAlign: 'center', padding: 20, background: '#f9f9f9', borderRadius: 10 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎧</div>
          <h3>Поддержка 24/7</h3>
          <p>Всегда на связи</p>
        </div>
        
        <div style={{ textAlign: 'center', padding: 20, background: '#f9f9f9', borderRadius: 10 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
          <h3>Гарантия качества</h3>
          <p>Только проверенные товары</p>
        </div>
      </div>

      {/* Популярные товары */}
      <h2 style={{ marginBottom: 20 }}>Популярные товары</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 20 
      }}>
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;