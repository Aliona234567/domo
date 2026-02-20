import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import './Cart.css';

const Cart = ({ navigate }) => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleQuantity = (id, newQty) => {
    if (newQty > 0) dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    alert('Товар удален');
  };

  const handleCheckout = () => {
    alert('Заказ оформлен!');
    dispatch(clearCart());
    navigate('products');
  };

  // Пустая корзина
  if (!items.length) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары, чтобы оформить заказ</p>
        <button onClick={() => navigate('products')}>
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Корзина</h1>
      
      {/* Таблица */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>Товар</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Цена</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Кол-во</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Сумма</th>
            <th style={{ padding: 10, textAlign: 'left' }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img 
                    src={item.image || 'https://via.placeholder.com/50'} 
                    alt={item.title}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                  />
                  <span>{item.title}</span>
                </div>
              </td>
              <td style={{ padding: 10 }}>${item.price?.toFixed(2)}</td>
              <td style={{ padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button 
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </td>
              <td style={{ padding: 10 }}>${(item.price * item.quantity).toFixed(2)}</td>
              <td style={{ padding: 10 }}>
                <button onClick={() => handleRemove(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Итого */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 0',
        borderTop: '2px solid #ddd'
      }}>
        <h2>Итого: ${totalAmount.toFixed(2)}</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => {
              if (window.confirm('Очистить корзину?')) {
                dispatch(clearCart());
              }
            }}
          >
            Очистить
          </button>
          <button 
            onClick={handleCheckout}
            style={{ background: '#4CAF50', color: 'white' }}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;