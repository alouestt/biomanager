import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/api';

const TablaInventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    cargarData();
  }, []);

  const cargarData = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2>📦 Inventario de Productos</h2>
        <div className="header-actions">
           <input 
            type="text" 
            placeholder="Buscar producto..." 
            className="search-input"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        {loading ? <p className="loading">Cargando...</p> : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(prod => (
                <tr key={prod.id} className={prod.stock < 10 ? 'stock-bajo' : ''}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>${prod.precio.toLocaleString()}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <span className={`stock-badge ${prod.stock > 10 ? 'ok' : 'low'}`}>
                      {prod.stock > 0 ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TablaInventario;