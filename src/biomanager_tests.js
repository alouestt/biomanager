// src/biomanager_tests.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';

// ========== Test 1: Renderizado del Login ==========
describe('Login Component', () => {
  test('renderiza el componente de login correctamente', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/BioManager/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('muestra mensaje de error con credenciales incorrectas', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'usuario_incorrecto' } });
    fireEvent.change(passwordInput, { target: { value: 'contraseña_incorrecta' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});

// ========== Test 2: Validación de Hooks ==========
describe('useState Hook', () => {
  test('useState actualiza el estado correctamente', () => {
    let testState;
    const TestComponent = () => {
      const [count, setCount] = React.useState(0);
      testState = { count, setCount };
      
      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(<TestComponent />);
    
    expect(getByTestId('count').textContent).toBe('0');
    
    fireEvent.click(getByText('Incrementar'));
    
    expect(getByTestId('count').textContent).toBe('1');
  });
});

// ========== Test 3: Context API ==========
describe('AuthContext', () => {
  test('proporciona datos de autenticación correctamente', () => {
    const TestComponent = () => {
      const { user, isAuthenticated } = useAuth();
      
      return (
        <div>
          <span data-testid="auth-status">
            {isAuthenticated() ? 'Autenticado' : 'No autenticado'}
          </span>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('No autenticado');
  });
});

// ========== Test 4: Peticiones HTTP con Axios ==========
describe('API Services', () => {
  test('getProductos retorna lista de productos', async () => {
    const { getProductos } = require('./services/api');
    
    const response = await getProductos();
    
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty('id');
    expect(response.data[0]).toHaveProperty('nombre');
    expect(response.data[0]).toHaveProperty('precio');
  });

  test('createVenta valida stock antes de crear venta', async () => {
    const { createVenta, getProductos } = require('./services/api');
    
    const productos = await getProductos();
    const producto = productos.data[0];
    
    const ventaData = {
      productoId: producto.id,
      cantidad: producto.stock + 10, // Más que el stock disponible
      vendedor: 'Test Vendedor'
    };

    await expect(createVenta(ventaData)).rejects.toThrow();
  });
});

// ========== Test 5: Rutas y Navegación ==========
describe('React Router Navigation', () => {
  test('redirige a login cuando no está autenticado', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    // Verificar que estamos en la página de login
    expect(screen.getByText(/BioManager/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
  });
});

// ========== Test 6: useReducer Hook ==========
describe('useReducer Hook - Carrito de Compras', () => {
  test('reducer maneja acciones correctamente', () => {
    const carritoReducer = (state, action) => {
      switch (action.type) {
        case 'AGREGAR_ITEM':
          return {
            ...state,
            items: [...state.items, action.payload]
          };
        case 'CALCULAR_TOTAL':
          const total = state.items.reduce((sum, item) => 
            sum + (item.producto.precio * item.cantidad), 0
          );
          return { ...state, total };
        default:
          return state;
      }
    };

    let state = { items: [], total: 0 };

    // Agregar item
    state = carritoReducer(state, {
      type: 'AGREGAR_ITEM',
      payload: {
        producto: { id: 1, precio: 10000 },
        cantidad: 2
      }
    });

    expect(state.items.length).toBe(1);
    expect(state.items[0].cantidad).toBe(2);

    // Calcular total
    state = carritoReducer(state, { type: 'CALCULAR_TOTAL' });

    expect(state.total).toBe(20000);
  });
});

// ========== Test 7: useEffect Hook ==========
describe('useEffect Hook', () => {
  test('useEffect se ejecuta al montar el componente', () => {
    let effectExecuted = false;

    const TestComponent = () => {
      React.useEffect(() => {
        effectExecuted = true;
      }, []);

      return <div>Test Component</div>;
    };

    render(<TestComponent />);

    expect(effectExecuted).toBe(true);
  });
});

// ========== Test 8: Integración Completa ==========
describe('Integration Tests', () => {
  test('flujo completo de login y navegación', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    // Ingresar credenciales
    const usernameInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    // Esperar redirección al dashboard
    await waitFor(() => {
      expect(screen.getByText(/Panel de Control/i)).toBeInTheDocument();
    });
  });
});

// ========== Comando para ejecutar tests ==========
// npm test
// npm test -- --coverage (para ver cobertura de código)