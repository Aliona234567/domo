import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../store/apiSlice';
import { setProducts, addProduct, updateProduct, deleteProduct } from '../../store/productsSlice';
import './AdminProducts.css';

const AdminProducts = ({ navigate }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.products || []);
  const { data: apiProducts, isLoading, refetch } = useGetProductsQuery();
  
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', price: 0, category: '', description: '', image: '' });

  // Загрузка товаров при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (!saved && apiProducts) {
      dispatch(setProducts(apiProducts));
    }
  }, [apiProducts, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' ? parseFloat(value) || 0 : value });
  };

  const openModal = (product = null) => {
    if (product) {
      setForm(product);
      setEditId(product.id);
    } else {
      setForm({ title: '', price: 0, category: '', description: '', image: '' });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateProduct({ ...form, id: editId }));
      alert('Товар обновлен');
    } else {
      dispatch(addProduct({ ...form, id: Date.now() }));
      alert('Товар добавлен');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить товар?')) {
      dispatch(deleteProduct(id));
      alert('Товар удален');
    }
  };

  const refreshFromApi = () => {
    refetch();
    alert('Данные обновлены');
  };

  if (isLoading && !products.length) {
    return <div style={{ textAlign: 'center', padding: 50 }}>Загрузка...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <button onClick={() => navigate('admin')} style={{ marginRight: 15 }}>← Назад</button>
          <h2 style={{ display: 'inline' }}>Управление товарами</h2>
        </div>
        <div>
          <button onClick={refreshFromApi} style={{ marginRight: 10 }}>Обновить</button>
          <button onClick={() => openModal()}>+ Добавить</button>
        </div>
      </div>

      {/* Таблица */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>Фото</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Название</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Категория</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Цена</th>
            <th style={{ padding: 10, textAlign: 'left' }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 10 }}>
                <img 
                  src={p.image || 'https://via.placeholder.com/50'} 
                  alt={p.title}
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                />
              </td>
              <td style={{ padding: 10 }}>{p.title}</td>
              <td style={{ padding: 10 }}>{p.category}</td>
              <td style={{ padding: 10 }}>${p.price}</td>
              <td style={{ padding: 10 }}>
                <button onClick={() => openModal(p)} style={{ marginRight: 5 }}>✏️</button>
                <button onClick={() => handleDelete(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'white', padding: 20, borderRadius: 8, width: 500
          }} onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Редактировать' : 'Добавить'} товар</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 15 }}>
                <label>Название *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: 8, marginTop: 5 }}
                />
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <label>Цена *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  style={{ width: '100%', padding: 8, marginTop: 5 }}
                />
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <label>Категория *</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: 8, marginTop: 5 }}
                />
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <label>Описание</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  style={{ width: '100%', padding: 8, marginTop: 5 }}
                />
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <label>URL изображения</label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 8, marginTop: 5 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)}>Отмена</button>
                <button type="submit">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;