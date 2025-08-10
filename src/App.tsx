import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Layout/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar';
import Profile from './components/user/Profile';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import { useLocation } from 'react-router-dom';



const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const login = localStorage.getItem('loginTime');
    const loginTime = parseInt(login??'100');
    const now = Date.now();

    const ONE_HOUR = 60 * 60 * 1000;

    if (loginTime && (now - loginTime) > ONE_HOUR) {
      setUser(null);
    }
    if (storedUser) {
      setUser(user);
    }
  }, []);

  const handleLogin = (userData:any) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loginTime', Date.now().toString())
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
          path="/login"
          element={user ? <Navigate to="/profile" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;