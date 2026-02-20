import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (currentPage.startsWith('admin')) {
      if (!isAuthenticated || !user?.isAdmin) {
        setCurrentPage('home');
        return <Home navigate={navigate} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'products':
        return <Products navigate={navigate} />;
      case 'cart':
        return <Cart navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'profile':
        return <Profile navigate={navigate} />;
      case 'admin':
        return <AdminDashboard navigate={navigate} />;
      case 'admin-products':
        return <AdminProducts navigate={navigate} />;
      case 'admin-orders':
        return <AdminOrders navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div >
      <Header navigate={navigate} currentPage={currentPage} />
      <main s>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}



export default App;