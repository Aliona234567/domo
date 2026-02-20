import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = ({ navigate }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  
  const products = useSelector((state) => state.products?.products || []);
  const loading = useSelector((state) => state.products?.loading || false);

  // Категории
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Фильтрация
  const filtered = products.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || p.category === category;
    return matchSearch && matchCategory;
  });

  // Загрузка
  if (loading && !products.length) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <div style={{ fontSize: 30, marginBottom: 10 }}>⏳</div>
        <div>Загрузка товаров...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Фильтры */}
      <div style={{ 
        display: 'flex', 
        gap: 10, 
        marginBottom: 20,
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 2, minWidth: 200 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Поиск товаров..."
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ddd',
              borderRadius: 5
            }}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: 150 }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ddd',
              borderRadius: 5
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Все категории' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Результаты */}
      {filtered.length > 0 ? (
        <>
          <div style={{ marginBottom: 20 }}>
            Найдено товаров: {filtered.length}
            {category !== 'all' && ` в категории "${category}"`}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 20
          }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <div style={{ fontSize: 50, marginBottom: 20 }}>📭</div>
          <h3>Товары не найдены</h3>
          <p style={{ marginBottom: 20 }}>Попробуйте изменить параметры поиска</p>
          {(search || category !== 'all') && (
            <button 
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer'
              }}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;