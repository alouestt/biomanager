import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🌱 BioManager</h1>
          <p>Gestión de Inventario y Ventas</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <div className="login-footer">
          <p>Credenciales de Prueba:</p>
          <small>Admin: admin / admin123</small>
          <small>Vendedor: vendedor / vendedor123</small>
        </div>
      </div>
    </div>
  );
};

export default Login;