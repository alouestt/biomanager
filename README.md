# BioManager - Sistema de Gesti¨®n para BioMarket Colombia

Sistema web de gesti¨®n de inventarios y ventas desarrollado con React para BioMarket Colombia S.A.S.

---

## Descripci¨®n del proyecto

BioManager es una aplicaci¨®n web moderna que automatiza y centraliza los procesos de gesti¨®n de inventarios y ventas para BioMarket Colombia, una empresa especializada en productos naturales y ecol¨®gicos.

### Funcionalidades principales

* **Autenticaci¨®n de Usuarios**: Sistema de login con roles (**Administrador** y **Vendedor**)
* **Dashboard Interactivo**: Panel de control con estad¨ªsticas en tiempo real
* **Gesti¨®n de Inventario**: **CRUD** completo de productos con b¨²squeda y filtros
* **Registro de Ventas**: Sistema de carrito de compras con validaci¨®n de stock
* **Control de Acceso**: Permisos basados en roles de usuario

---

## Tecnolog¨ªas utilizadas

### Front-End
* **React 18.2.0**: Biblioteca principal para la construcci¨®n de la UI
* **React Router DOM 6.20.0**: Navegaci¨®n y enrutamiento SPA
* **Axios 1.6.0**: Cliente HTTP para comunicaci¨®n con APIs
* **CSS3**: Estilos personalizados con dise?o responsive

### Conceptos implementados

#### 1. **REST con Swagger**
Aunque el proyecto usa datos mock para desarrollo, est¨¢ preparado para conectarse a una **API RESTful** documentada con Swagger/OpenAPI. Los endpoints est¨¢n definidos en `src/services/api.js`.

#### 2. **ReactJS - Componentes**
Arquitectura basada en **componentes reutilizables**:
* `Login.js`: Componente de autenticaci¨®n
* `Dashboard.js`: Panel de estad¨ªsticas
* `TablaInventario.js`: Listado y gesti¨®n de productos
* `FormularioProducto.js`: Formulario CRUD de productos
* `RegistroVenta.js`: Sistema de ventas

#### 3. **Hooks de React**

**useState:**
```javascript
const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(true);
````

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

Accede al contexto de autenticaci¨®n desde cualquier componente.

**useReducer:**

```javascript
const [carrito, dispatch] = useReducer(carritoReducer, initialState);
dispatch({ type: 'AGREGAR_ITEM', payload: item });
```

Gestiona estados complejos del carrito de compras con acciones definidas.

#### 4\. **Context API**

Sistema global de estado para **autenticaci¨®n** (`AuthContext.js`):

  * Manejo de sesi¨®n de usuario
  * Verificaci¨®n de roles
  * Persistencia con localStorage
  * Protecci¨®n de rutas

#### 5\. **Peticiones HTTP con Axios**

Configuraci¨®n centralizada en `api.js`:

  * Interceptores para tokens **JWT**
  * Manejo de errores global
  * Sistema mock para desarrollo local
  * Endpoints para productos, ventas y estad¨ªsticas

#### 6\. **Rutas y navegaci¨®n**

React Router implementa:

  * Rutas p¨²blicas (`/login`)
  * Rutas protegidas (`/dashboard`, `/inventario`, `/ventas`)
  * Redirecci¨®n autom¨¢tica seg¨²n autenticaci¨®n
  * Layout compartido con navegaci¨®n

#### 7\. **Despliegue**

El proyecto est¨¢ optimizado para despliegue en:

  * **Vercel**: Frontend optimizado
  * **Netlify**: Alternativa con CI/CD
  * **AWS S3 + CloudFront**: Para producci¨®n empresarial

-----

## Estructura del proyecto

```
biomanager/
©À©¤©¤ public/
©¦   ©À©¤©¤ index.html
©¦   ©¸©¤©¤ favicon.ico
©À©¤©¤ src/
©¦   ©À©¤©¤ components/
©¦   ©¦   ©À©¤©¤ Login.js
©¦   ©¦   ©À©¤©¤ Dashboard.js
©¦   ©¦   ©À©¤©¤ TablaInventario.js
©¦   ©¦   ©À©¤©¤ FormularioProducto.js
©¦   ©¦   ©¸©¤©¤ RegistroVenta.js
©¦   ©À©¤©¤ context/
©¦   ©¦   ©¸©¤©¤ AuthContext.js
©¦   ©À©¤©¤ services/
©¦   ©¦   ©¸©¤©¤ api.js
©¦   ©À©¤©¤ App.js
©¦   ©À©¤©¤ App.css
©¦   ©À©¤©¤ App.test.js
©¦   ©¸©¤©¤ index.js
©À©¤©¤ package.json
©À©¤©¤ README.md
©¸©¤©¤ .gitignore
```

-----

## Instalaci¨®n y configuraci¨®n

### Prerrequisitos

  * Node.js v14 o superior
  * npm o yarn
  * Git

### Paso 1: Clonar el repositorio

```bash
git clone [https://github.com/tu-usuario/biomanager.git](https://github.com/tu-usuario/biomanager.git)
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

La aplicaci¨®n estar¨¢ disponible en `http://localhost:3000`

-----

## Credenciales de prueba

| Rol | Usuario | Contrase?a | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Acceso completo (**CRUD** de productos, ver estad¨ªsticas, gestionar ventas) |
| **Vendedor** | `vendedor` | `vendedor123` | Ver inventario, registrar ventas, ver dashboard |

-----

## Testing

### Ejecutar pruebas unitarias

```bash
npm test
```

### Ver cobertura de c¨®digo

```bash
npm test -- --coverage
```

### Tipos de pruebas implementadas:

1.  **Pruebas de Componentes**: Renderizado y comportamiento de UI
2.  **Pruebas de Hooks**: `useState`, `useEffect`, `useContext`, `useReducer`
3.  **Pruebas de Context API**: Autenticaci¨®n y estado global
4.  **Pruebas de API**: Servicios HTTP con Axios
5.  **Pruebas de Rutas**: Navegaci¨®n y protecci¨®n de rutas
6.  **Pruebas de Integraci¨®n**: Flujos completos de usuario

-----

## Build para producci¨®n

```bash
npm run build
```

Genera una carpeta `build/` optimizada para producci¨®n.

## Despliegue

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

1.  Ejecutar `npm run build`
2.  Subir carpeta `build/` al servidor
3.  Configurar servidor web (Apache/Nginx) para SPA

-----

## Seguridad

  * Autenticaci¨®n con **JWT** tokens
  * Rutas protegidas con validaci¨®n de sesi¨®n
  * Limpieza autom¨¢tica de sesi¨®n expirada
  * Validaci¨®n de permisos por rol
  * Sanitizaci¨®n de inputs en formularios

## Caracter¨ªsticas UX/UI

  * Dise?o **responsive** (m¨®vil, tablet, desktop)
  * Interfaz intuitiva con iconos descriptivos
  * Feedback visual en todas las acciones
  * Estados de carga para mejor experiencia
  * Validaciones en tiempo real
  * Confirmaciones para acciones cr¨ªticas

## Funcionalidades por m¨®dulo

### Dashboard

  * Total de productos en inventario
  * Total de ventas realizadas
  * Ingresos totales generados
  * Ventas del d¨ªa actual
  * Alertas de stock bajo
  * Tabla de ventas recientes

### Inventario

  * Listado completo de productos
  * B¨²squeda por nombre, categor¨ªa o proveedor
  * Creaci¨®n de nuevos productos (solo **Admin**)
  * Edici¨®n de productos existentes (solo **Admin**)
  * Eliminaci¨®n de productos (solo **Admin**)
  * Indicadores visuales de stock bajo

### Ventas

  * Selecci¨®n de productos disponibles
  * Carrito de compras interactivo
  * Validaci¨®n de stock en tiempo real
  * C¨¢lculo autom¨¢tico de totales
  * Registro de vendedor
  * Actualizaci¨®n autom¨¢tica de inventario

-----

## Flujo de datos

1.  Usuario ingresa credenciales **¡ú** Login
2.  `AuthContext` valida y guarda sesi¨®n
3.  Redirecci¨®n a **Dashboard** seg¨²n rol
4.  Componentes consultan **API** v¨ªa **Axios**
5.  Estado local (`useState`/`useReducer`) gestiona **UI**
6.  **Context API** mantiene sesi¨®n global
7.  Rutas protegen acceso seg¨²n autenticaci¨®n

-----

## Soluci¨®n de problemas

### La aplicaci¨®n no inicia

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

-----

## Mantenimiento y actualizaci¨®n

### Actualizar dependencias

```bash
npm update
npm audit fix
```

### Agregar nuevas funcionalidades

1.  Crear componente en `src/components/`
2.  Agregar ruta en `App.js`
3.  Actualizar servicios en `api.js`
4.  Escribir tests correspondientes

-----

## Contribuci¨®n

1.  Fork el proyecto
2.  Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3.  Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4.  Push a la rama (`git push origin feature/nueva-funcionalidad`)
5.  Abrir **Pull Request**

-----

## Licencia

Proyecto educativo desarrollado para BioMarket Colombia S.A.S.

## Equipo de desarrollo

Proyecto desarrollado como parte del curso de Desarrollo de Software Front-End.

## Soporte

Para preguntas o problemas, contactar a trav¨¦s del repositorio de **GitHub**.

-----

**Desarrollado para BioMarket Colombia**