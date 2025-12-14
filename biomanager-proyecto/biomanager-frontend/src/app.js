// src/app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TablaInventario from './components/TablaInventario';
import RegistroVenta from './components/RegistroVenta'; 
import './app.css'; 

// Componente para proteger rutas privadas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout principal con navegación
const MainLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout();
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>🌱 BioManager</h1>
          <span className="navbar-subtitle">BioMarket Colombia</span>
        </div>
        
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            📊 Dashboard
          </Link>
          <Link to="/inventario" className="nav-link">
            📦 Inventario
          </Link>
          <Link to="/ventas" className="nav-link">
            🛒 Ventas
          </Link>
        </div>

        <div className="navbar-user">
          <span className="user-info">
            <strong>{user?.nombre}</strong>
            <small>{user?.rol}</small>
          </span>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>© 2024 BioMarket Colombia S.A.S. - Sistema BioManager v1.0</p>
      </footer>
    </div>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública - Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas con el layout principal */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/inventario"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <TablaInventario />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/ventas"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <RegistroVenta />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;