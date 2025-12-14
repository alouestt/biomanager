# 🌱 BioManager - Sistema de Gestión para BioMarket Colombia

Sistema web de gestión de inventarios y ventas desarrollado con React para BioMarket Colombia S.A.S.

## 📋 Descripción del Proyecto

BioManager es una aplicación web moderna que automatiza y centraliza los procesos de gestión de inventarios y ventas para BioMarket Colombia, una empresa especializada en productos naturales y ecológicos.

### Funcionalidades Principales

- **Autenticación de Usuarios**: Sistema de login con roles (Administrador y Vendedor)
- **Dashboard Interactivo**: Panel de control con estadísticas en tiempo real
- **Gestión de Inventario**: CRUD completo de productos con búsqueda y filtros
- **Registro de Ventas**: Sistema de carrito de compras con validación de stock
- **Control de Acceso**: Permisos basados en roles de usuario

## 🛠️ Tecnologías Utilizadas

### Front-End
- **React 18.2.0**: Biblioteca principal para la construcción de la UI
- **React Router DOM 6.20.0**: Navegación y enrutamiento SPA
- **Axios 1.6.0**: Cliente HTTP para comunicación con APIs
- **CSS3**: Estilos personalizados con diseño responsive

### Conceptos Implementados

#### 1. **REST con Swagger**
Aunque el proyecto usa datos mock para desarrollo, está preparado para conectarse a una API RESTful documentada con Swagger/OpenAPI. Los endpoints están definidos en `src/services/api.js`.

#### 2. **ReactJS - Componentes**
Arquitectura basada en componentes reutilizables:
- `Login.js`: Componente de autenticación
- `Dashboard.js`: Panel de estadísticas
- `TablaInventario.js`: Listado y gestión de productos
- `FormularioProducto.js`: Formulario CRUD de productos
- `RegistroVenta.js`: Sistema de ventas

#### 3. **Hooks de React**

**useState:**
```javascript
const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(true);
```
Maneja el estado local de componentes como listas de productos y estados de carga.

**useEffect:**
```javascript
useEffect(() => {
  cargarProductos();
}, []);
```
Ejecuta efectos secundarios como llamadas a API al montar componentes.

**useContext:**
```javascript
const { user, isAdmin } = useAuth();
```
Accede al contexto de autenticación desde cualquier componente.

**useReducer:**
```javascript
const [carrito, dispatch] = useReducer(carritoReducer, initialState);
dispatch({ type: 'AGREGAR_ITEM', payload: item });
```
Gestiona estados complejos del carrito de compras con acciones definidas.

#### 4. **Context API**
Sistema global de estado para autenticación (`AuthContext.js`):
- Manejo de sesión de usuario
- Verificación de roles
- Persistencia con localStorage
- Protección de rutas

#### 5. **Peticiones HTTP con Axios**
Configuración centralizada en `api.js`:
- Interceptores para tokens JWT
- Manejo de errores global
- Sistema mock para desarrollo local
- Endpoints para productos, ventas y estadísticas

#### 6. **Rutas y Navegación**
React Router implementa:
- Rutas públicas (`/login`)
- Rutas protegidas (`/dashboard`, `/inventario`, `/ventas`)
- Redirección automática según autenticación
- Layout compartido con navegación

#### 7. **Despliegue**
El proyecto está optimizado para despliegue en:
- **Vercel**: Frontend optimizado
- **Netlify**: Alternativa con CI/CD
- **AWS S3 + CloudFront**: Para producción empresarial

## 📁 Estructura del Proyecto

```
biomanager/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── TablaInventario.js
│   │   ├── FormularioProducto.js
│   │   └── RegistroVenta.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js v14 o superior
- npm o yarn
- Git

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/biomanager.git
cd biomanager
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Configurar variables de entorno (opcional)
Editar `src/services/api.js` y cambiar:
```javascript
const USE_MOCK = false; // Para usar API real
const api = axios.create({
  baseURL: 'http://tu-backend-url/api'
});
```

### Paso 4: Iniciar servidor de desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`

## 👤 Credenciales de Prueba

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Permisos**: Acceso completo (CRUD de productos, ver estadísticas, gestionar ventas)

### Vendedor
- **Usuario**: `vendedor`
- **Contraseña**: `vendedor123`
- **Permisos**: Ver inventario, registrar ventas, ver dashboard

## 🧪 Testing

### Ejecutar pruebas unitarias
```bash
npm test
```

### Ver cobertura de código
```bash
npm test -- --coverage
```

### Tipos de pruebas implementadas:
1. **Pruebas de Componentes**: Renderizado y comportamiento de UI
2. **Pruebas de Hooks**: useState, useEffect, useContext, useReducer
3. **Pruebas de Context API**: Autenticación y estado global
4. **Pruebas de API**: Servicios HTTP con Axios
5. **Pruebas de Rutas**: Navegación y protección de rutas
6. **Pruebas de Integración**: Flujos completos de usuario

## 📦 Build para Producción

```bash
npm run build
```

Genera una carpeta `build/` optimizada para producción.

## 🌐 Despliegue

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Manual (Servidor Web)
1. Ejecutar `npm run build`
2. Subir carpeta `build/` al servidor
3. Configurar servidor web (Apache/Nginx) para SPA

## 🔒 Seguridad

- Autenticación con JWT tokens
- Rutas protegidas con validación de sesión
- Limpieza automática de sesión expirada
- Validación de permisos por rol
- Sanitización de inputs en formularios

## 🎨 Características UX/UI

- Diseño responsive (móvil, tablet, desktop)
- Interfaz intuitiva con iconos descriptivos
- Feedback visual en todas las acciones
- Estados de carga para mejor experiencia
- Validaciones en tiempo real
- Confirmaciones para acciones críticas

## 📊 Funcionalidades por Módulo

### Dashboard
- Total de productos en inventario
- Total de ventas realizadas
- Ingresos totales generados
- Ventas del día actual
- Alertas de stock bajo
- Tabla de ventas recientes

### Inventario
- Listado completo de productos
- Búsqueda por nombre, categoría o proveedor
- Creación de nuevos productos (solo Admin)
- Edición de productos existentes (solo Admin)
- Eliminación de productos (solo Admin)
- Indicadores visuales de stock bajo

### Ventas
- Selección de productos disponibles
- Carrito de compras interactivo
- Validación de stock en tiempo real
- Cálculo automático de totales
- Registro de vendedor
- Actualización automática de inventario

## 🔄 Flujo de Datos

1. Usuario ingresa credenciales → Login
2. AuthContext valida y guarda sesión
3. Redirección a Dashboard según rol
4. Componentes consultan API vía Axios
5. Estado local (useState/useReducer) gestiona UI
6. Context API mantiene sesión global
7. Rutas protegen acceso según autenticación

## 🐛 Solución de Problemas

### La aplicación no inicia
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Errores de CORS
Configurar proxy en `package.json`:
```json
"proxy": "http://localhost:8080"
```

### Datos mock no aparecen
Verificar en `api.js`:
```javascript
const USE_MOCK = true;
```

## 📝 Mantenimiento y Actualización

### Actualizar dependencias
```bash
npm update
npm audit fix
```

### Agregar nuevas funcionalidades
1. Crear componente en `src/components/`
2. Agregar ruta en `App.js`
3. Actualizar servicios en `api.js`
4. Escribir tests correspondientes

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Proyecto educativo desarrollado para BioMarket Colombia S.A.S.

## 👥 Equipo de Desarrollo

Proyecto desarrollado como parte del curso de Desarrollo de Software Front-End.

## 📞 Soporte

Para preguntas o problemas, contactar a través del repositorio de GitHub.

---

**Desarrollado con ❤️ para BioMarket Colombia**