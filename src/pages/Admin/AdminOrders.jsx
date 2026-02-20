import React, { useState } from 'react';
import './AdminOrders.css';

const AdminOrders = ({ navigate }) => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      customer: 'Иван Петров',
      items: [
        { name: 'Ноутбук', quantity: 1, price: 999.99 },
        { name: 'Мышь', quantity: 1, price: 29.99 }
      ],
      total: 1029.98,
      status: 'delivered',
      date: '2024-01-15',
      address: 'ул. Пушкина, д. 10',
      phone: '+7 (999) 123-45-67'
    },
    { 
      id: 2, 
      customer: 'Мария Иванова',
      items: [{ name: 'Смартфон', quantity: 1, price: 699.99 }],
      total: 699.99,
      status: 'shipped',
      date: '2024-01-14',
      address: 'ул. Лермонтова, д. 5',
      phone: '+7 (999) 234-56-78'
    },
    { 
      id: 3, 
      customer: 'Алексей Сидоров',
      items: [{ name: 'Наушники', quantity: 2, price: 89.99 }],
      total: 179.98,
      status: 'pending',
      date: '2024-01-14',
      address: 'ул. Гоголя, д. 15',
      phone: '+7 (999) 345-67-89'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const statusMap = {
    pending: 'Ожидает',
    shipped: 'В пути',
    delivered: 'Доставлен',
    cancelled: 'Отменен'
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? {...o, status: newStatus} : o));
    alert(`Статус заказа #${id} изменен на "${statusMap[newStatus]}"`);
  };

  const saveChanges = () => {
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('Изменения сохранены');
  };

  return (
    <div className="admin-orders">
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <button onClick={() => navigate('admin')} style={{ marginRight: 15 }}>← Назад</button>
          <h1 style={{ display: 'inline' }}>Управление заказами</h1>
        </div>
        <button onClick={saveChanges}>Сохранить</button>
      </div>

      {/* Таблица */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>ID</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Клиент</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Сумма</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Статус</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Дата</th>
            <th style={{ padding: 10, textAlign: 'left' }}></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.id}>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 10 }}>#{order.id}</td>
                <td style={{ padding: 10 }}>{order.customer}</td>
                <td style={{ padding: 10 }}>${order.total}</td>
                <td style={{ padding: 10 }}>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Ожидает</option>
                    <option value="shipped">В пути</option>
                    <option value="delivered">Доставлен</option>
                    <option value="cancelled">Отменен</option>
                  </select>
                </td>
                <td style={{ padding: 10 }}>{order.date}</td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => {
                    setCurrentOrder(order);
                    setShowModal(true);
                  }}>
                    Детали
                  </button>
                </td>
              </tr>
              {/* Детали заказа под строкой */}
              <tr style={{ background: '#fafafa' }}>
                <td colSpan="6" style={{ padding: '10px 30px' }}>
                  <div>
                    <p><strong>Адрес:</strong> {order.address}</p>
                    <p><strong>Телефон:</strong> {order.phone}</p>
                    <p><strong>Товары:</strong></p>
                    {order.items.map((item, i) => (
                      <p key={i} style={{ marginLeft: 20 }}>
                        {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                      </p>
                    ))}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Модальное окно */}
      {showModal && currentOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(139, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'white', padding: 20, borderRadius: 8, maxWidth: 500, width: '100%'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Заказ #{currentOrder.id}</h2>
            
            <p><strong>Клиент:</strong> {currentOrder.customer}</p>
            <p><strong>Телефон:</strong> {currentOrder.phone}</p>
            <p><strong>Адрес:</strong> {currentOrder.address}</p>
            <p><strong>Дата:</strong> {currentOrder.date}</p>
            <p><strong>Статус:</strong> {statusMap[currentOrder.status]}</p>
            
            <p><strong>Товары:</strong></p>
            {currentOrder.items.map((item, i) => (
              <p key={i} style={{ marginLeft: 20 }}>
                {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
              </p>
            ))}
            
            <p><strong>Итого:</strong> ${currentOrder.total}</p>
            
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;