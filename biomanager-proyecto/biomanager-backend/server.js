const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // El puerto donde correrá el servidor

// Middleware
app.use(cors()); // Permite que tu Front-End (puerto 3000) hable con este Back-End
app.use(bodyParser.json());

// --- BASE DE DATOS SIMULADA (Para la Demo del Video) ---

// Usuario de prueba para el Login
const users = [
    { id: 1, username: 'admin', password: '123', name: 'Administrador BioManager' }
];

// Inventario inicial
let inventario = [
    { id: 1, nombre: 'Mascarillas N95', cantidad: 50, precio: 2500 },
    { id: 2, nombre: 'Guantes de Nitrilo', cantidad: 100, precio: 1500 },
    { id: 3, nombre: 'Alcohol Antiséptico', cantidad: 30, precio: 5000 },
    { id: 4, nombre: 'Bata Quirúrgica', cantidad: 20, precio: 12000 }
];

// Ventas realizadas
let ventas = [];

// --- RUTAS DEL API (Endpoints) ---

// 1. Ruta de Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Intento de login: ${username}`);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // En un caso real aquí iría un JWT, para la demo enviamos un objeto simple
        res.json({ success: true, user: user, token: 'demo-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
});

// 2. Ruta para obtener Inventario (GET)
app.get('/api/inventario', (req, res) => {
    res.json(inventario);
});

// 3. Ruta para registrar una Venta (POST)
app.post('/api/ventas', (req, res) => {
    const { productoId, cantidad } = req.body;
    
    // Buscar el producto
    const producto = inventario.find(p => p.id === parseInt(productoId));

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (producto.cantidad < cantidad) {
        return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Actualizar inventario (restar cantidad)
    producto.cantidad -= cantidad;

    // Registrar la venta
    const nuevaVenta = {
        id: ventas.length + 1,
        producto: producto.nombre,
        cantidad: cantidad,
        total: producto.precio * cantidad,
        fecha: new Date()
    };
    ventas.push(nuevaVenta);

    console.log("Venta registrada:", nuevaVenta);
    res.json({ success: true, message: 'Venta exitosa', venta: nuevaVenta });
});


// === LO QUE FALTABA: RUTA DE BIENVENIDA ===
// Esta ruta responde cuando se accede a la raíz del servidor (http://localhost:5000)
app.get('/', (req, res) => {
    res.send('✅ BioManager Back-End API está funcionando. Conéctate a http://localhost:3000 para usar la aplicación.');
});
// ===========================================


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Back-End corriendo en http://localhost:${PORT}`);
    console.log(`Listo para conectar con BioManager Front-End`);
});