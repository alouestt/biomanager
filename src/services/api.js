import axios from 'axios';

// Simulación de base de datos local (Mock Data)
const DATOS_MOCK = {
  productos: [
    { id: 1, nombre: 'Arroz Integral Orgánico', precio: 4500, stock: 50, categoria: 'Granos' },
    { id: 2, nombre: 'Aceite de Coco Virgen', precio: 22000, stock: 15, categoria: 'Aceites' },
    { id: 3, nombre: 'Quinoa Real', precio: 12000, stock: 30, categoria: 'Granos' },
    { id: 4, nombre: 'Leche de Almendras', precio: 9500, stock: 0, categoria: 'Bebidas' },
    { id: 5, nombre: 'Miel de Abeja Pura', precio: 18000, stock: 25, categoria: 'Endulzantes' },
  ],
  ventas: []
};

// Función para simular retraso de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProductos = async () => {
  await delay(500);
  // Retorna una copia de los datos
  return { data: [...DATOS_MOCK.productos] };
};

export const createVenta = async (ventaData) => {
  await delay(800);
  
  // Buscar producto y validar stock
  const productoIndex = DATOS_MOCK.productos.findIndex(p => p.id === parseInt(ventaData.productoId));
  const producto = DATOS_MOCK.productos[productoIndex];

  if (!producto) throw new Error("Producto no encontrado");
  if (producto.stock < ventaData.cantidad) throw new Error("Stock insuficiente");

  // Actualizar stock simulado
  DATOS_MOCK.productos[productoIndex].stock -= ventaData.cantidad;
  
  // Registrar venta simulada
  const nuevaVenta = { 
    id: DATOS_MOCK.ventas.length + 1, 
    fecha: new Date(), 
    ...ventaData,
    total: producto.precio * ventaData.cantidad
  };
  DATOS_MOCK.ventas.push(nuevaVenta);

  return { data: nuevaVenta };
};

export const getEstadisticas = async () => {
  await delay(500);
  const totalVentas = DATOS_MOCK.ventas.reduce((acc, v) => acc + v.total, 0);
  return {
    data: {
      productosTotal: DATOS_MOCK.productos.length,
      ventasTotal: DATOS_MOCK.ventas.length,
      ingresosTotal: totalVentas,
      stockBajo: DATOS_MOCK.productos.filter(p => p.stock < 10).length
    }
  };
};