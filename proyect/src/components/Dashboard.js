import React, { useState, useEffect } from 'react';
import { getEstadisticas } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    productosTotal: 0,
    ventasTotal: 0,
    ingresosTotal: 0,
    stockBajo: 0
  });

  useEffect(() => {
    cargarStats();
  }, []);

  const cargarStats = async () => {
    try {
      const response = await getEstadisticas();
      setStats(response.data);
    } catch (error) {
      console.error("Error cargando stats", error);
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Panel de Control</h2>
        <p>Resumen general del negocio</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Inventario Total</h3>
            <div className="stat-value">{stats.productosTotal}</div>
            <small>Productos registrados</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>Ventas Totales</h3>
            <div className="stat-value">{stats.ventasTotal}</div>
            <small>Transacciones</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Ingresos</h3>
            <div className="stat-value">{formatCurrency(stats.ingresosTotal)}</div>
            <small>COP</small>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Stock Bajo</h3>
            <div className="stat-value">{stats.stockBajo}</div>
            <small>Requieren atención</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;