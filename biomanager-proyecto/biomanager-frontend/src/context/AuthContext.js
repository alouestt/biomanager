import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay sesión guardada al cargar
    const storedUser = localStorage.getItem('biomanager_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    // Simulación de autenticación (Admin y Vendedor)
    if (username === 'admin' && password === 'admin123') {
      const userData = { nombre: 'Administrador', rol: 'Administrador' };
      setUser(userData);
      localStorage.setItem('biomanager_user', JSON.stringify(userData));
      return true;
    } 
    
    if (username === 'vendedor' && password === 'vendedor123') {
      const userData = { nombre: 'Vendedor Juan', rol: 'Vendedor' };
      setUser(userData);
      localStorage.setItem('biomanager_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('biomanager_user');
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.rol === 'Administrador';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);