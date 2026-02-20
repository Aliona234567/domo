import React from 'react';
import { useSelector } from 'react-redux';
import './AdminDashboard.css';

const AdminDashboard = ({ navigate }) => {
  const products = useSelector((state) => state.products?.products || []);
  
  const recentOrders = [
    { id: 1, customer: 'Иван Петров', total: 150, status: 'Доставлен', date: '2024-01-15' },
    { id: 2, customer: 'Мария Иванова', total: 230, status: 'В пути', date: '2024-01-14' },
    { id: 3, customer: 'Алексей Сидоров', total: 89, status: 'Обработка', date: '2024-01-14' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Статистика */}
      <div >
        <div className="stat-card">
          <h3>Товары</h3>
          <h2>{products.length}</h2>
          <button onClick={() => navigate('admin-products')}>Управлять →</button>
        </div>
        
        <div className="stat-card">
          <h3>Заказы</h3>
          <h2>12</h2>
          <button onClick={() => navigate('admin-orders')}>Управлять →</button>
        </div>
        
        <div className="stat-card">
          <h3>Пользователи</h3>
          <h2>45</h2>
        </div>
        
        <div className="stat-card">
          <h3>Выручка</h3>
          <h2>$1250</h2>
        </div>
      </div>

      {/* Заказы */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h3>Последние заказы</h3>
          <button onClick={() => navigate('admin-orders')}>Все заказы →</button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>ID</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Клиент</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Сумма</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Статус</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Дата</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>#{order.id}</td>
                <td style={{ padding: 10 }}>{order.customer}</td>
                <td style={{ padding: 10 }}>${order.total}</td>
                <td style={{ padding: 10 }}>{order.status}</td>
                <td style={{ padding: 10 }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Действия */}
      <div>
        <h3 style={{ marginBottom: 15 }}>Быстрые действия</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('admin-products')}>
            Управление товарами
          </button>
          <button onClick={() => navigate('admin-orders')}>
            Управление заказами
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;