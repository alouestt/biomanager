// src/components/RegistroVenta.js
import React, { useState, useEffect, useReducer } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProductos, createVenta } from '../services/api';

// Reducer para manejar el carrito de compras
const carritoReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_ITEM':
      const itemExistente = state.items.find(item => item.producto.id === action.payload.producto.id);
      
      if (itemExistente) {
        return {
          ...state,
          items: state.items.map(item =>
            item.producto.id === action.payload.producto.id
              ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'ELIMINAR_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.producto.id !== action.payload)
      };
    
    case 'ACTUALIZAR_CANTIDAD':
      return {
        ...state,
        items: state.items.map(item =>
          item.producto.id === action.payload.id
            ? { ...item, cantidad: action.payload.cantidad }
            : item
        )
      };
    
    case 'CALCULAR_TOTAL':
      const total = state.items.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
      return { ...state, total };
    
    case 'LIMPIAR_CARRITO':
      return { items: [], total: 0 };
    
    default:
      return state;
  }
};

const RegistroVenta = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Usar useReducer para gestionar el carrito
  const [carrito, dispatch] = useReducer(carritoReducer, { items: [], total: 0 });

  useEffect(() => {
    cargarProductos();
  }, []);

  // Recalcular el total cada vez que cambian los items
  useEffect(() => {
    dispatch({ type: 'CALCULAR_TOTAL' });
  }, [carrito.items]);

  const cargarProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response.data.filter(p => p.stock > 0));
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar los productos');
    }
  };

  const handleAgregarAlCarrito = () => {
    if (!productoSeleccionado) {
      alert('Selecciona un producto');
      return;
    }

    const producto = productos.find(p => p.id === parseInt(productoSeleccionado));
    
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    if (cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    const cantidadEnCarrito = carrito.items.find(item => item.producto.id === producto.id)?.cantidad || 0;
    
    if (cantidadEnCarrito + cantidad > producto.stock) {
      alert(`Stock insuficiente. Disponible: ${producto.stock}, En carrito: ${cantidadEnCarrito}`);
      return;
    }

    dispatch({
      type: 'AGREGAR_ITEM',
      payload: { producto, cantidad: parseInt(cantidad) }
    });

    setProductoSeleccionado('');
    setCantidad(1);
    setError('');
  };

  const handleEliminarDelCarrito = (productoId) => {
    dispatch({ type: 'ELIMINAR_ITEM', payload: productoId });
  };

  const handleActualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      handleEliminarDelCarrito(productoId);
      return;
    }

    const item = carrito.items.find(i => i.producto.id === productoId);
    if (nuevaCantidad > item.producto.stock) {
      alert(`Stock insuficiente. Disponible: ${item.producto.stock}`);
      return;
    }

    dispatch({
      type: 'ACTUALIZAR_CANTIDAD',
      payload: { id: productoId, cantidad: parseInt(nuevaCantidad) }
    });
  };

  const handleProcesarVenta = async () => {
    if (carrito.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Procesar cada item del carrito como una venta individual
      for (const item of carrito.items) {
        await createVenta({
          productoId: item.producto.id,
          cantidad: item.cantidad,
          vendedor: user.nombre
        });
      }

      alert('Venta registrada exitosamente');
      dispatch({ type: 'LIMPIAR_CARRITO' });
      cargarProductos(); // Recargar productos para actualizar stock
    } catch (err) {
      setError('Error al procesar la venta: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="ventas-container">
      <h2>🛒 Registro de Ventas</h2>

      <div className="ventas-layout">
        <div className="seleccion-productos">
          <h3>Seleccionar Productos</h3>
          
          <div className="form-group">
            <label htmlFor="producto">Producto</label>
            <select
              id="producto"
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
              disabled={loading}
            >
              <option value="">Seleccionar producto...</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} - {formatCurrency(producto.precio)} (Stock: {producto.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              disabled={loading}
            />
          </div>

          <button onClick={handleAgregarAlCarrito} className="btn-primary" disabled={loading}>
            Agregar al Carrito
          </button>
        </div>

        <div className="carrito">
          <h3>Carrito de Compras</h3>
          
          {carrito.items.length === 0 ? (
            <p className="carrito-vacio">El carrito está vacío</p>
          ) : (
            <>
              <div className="carrito-items">
                {carrito.items.map(item => (
                  <div key={item.producto.id} className="carrito-item">
                    <div className="item-info">
                      <strong>{item.producto.nombre}</strong>
                      <span>{formatCurrency(item.producto.precio)} x {item.cantidad}</span>
                      <span className="item-total">{formatCurrency(item.producto.precio * item.cantidad)}</span>
                    </div>
                    <div className="item-actions">
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => handleActualizarCantidad(item.producto.id, e.target.value)}
                        min="1"
                        max={item.producto.stock}
                        className="cantidad-input"
                      />
                      <button
                        onClick={() => handleEliminarDelCarrito(item.producto.id)}
                        className="btn-delete-small"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="carrito-total">
                <h4>Total: {formatCurrency(carrito.total)}</h4>
              </div>

              <button
                onClick={handleProcesarVenta}
                className="btn-success"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Procesar Venta'}
              </button>
            </>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegistroVenta;