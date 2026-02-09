export const API_BASE_URL = 'https://pruebareactjs.test-class.com/Api/';

export const ROUTES = {
  LOGIN: '/login',
  REGISTRO: '/registro',
  HOME: '/home',
  CONSULTA_CLIENTES: '/consulta-clientes',
  MANTENIMIENTO_CLIENTES: '/mantenimiento-clientes',
  MANTENIMIENTO_CLIENTES_EDIT: '/mantenimiento-clientes/:id',
  ERROR: '*',
  ROOT: '/'
} as const;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'api/Authenticate/login',
    REGISTER: 'api/Authenticate/register'
  },
  CLIENTE: {
    LISTADO: 'api/Cliente/Listado',
    OBTENER: 'api/Cliente/Obtener',
    CREAR: 'api/Cliente/Crear',
    ACTUALIZAR: 'api/Cliente/Actualizar',
    ELIMINAR: 'api/Cliente/Eliminar'
  },
  INTERESES: {
    LISTADO: 'api/Intereses/Listado'
  }
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'userId',
  USERNAME: 'username',
  REMEMBER_ME: 'rememberMe',
  REMEMBERED_USERNAME: 'rememberedUsername'
} as const;

export const FIELD_VALIDATION = {
  NAME: {
    MIN: 1,
    MAX: 50
  },
  APELLIDOS: {
    MIN: 1,
    MAX: 100
  },
  IDENTIFICACION: {
    MIN: 1,
    MAX: 20
  },
  TELEFONO: {
    MIN: 1,
    MAX: 20
  },
  DIRECCION: {
    MIN: 1,
    MAX: 200
  },
  RESENA: {
    MIN: 1,
    MAX: 200
  },
  PASSWORD: {
    MIN: 9,
    MAX: 20
  }
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,20}$/,
  PHONE: /^[0-9\-+()\s]{1,20}$/,
  IDENTIFIER: /^[a-zA-Z0-9-]{1,20}$/,
  SEXO: /^[MF]$/
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'El email no es válido',
  PASSWORD_WEAK: 'La contraseña debe tener 9-20 caracteres, una mayúscula, una minúscula y números',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  INVALID_FORMAT: 'El formato no es válido',
  INVALID_PHONE: 'El teléfono no es válido',
  INVALID_DATE: 'La fecha no es válida'
} as const;

export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNAUTHORIZED: 'Usuario o contraseña incorrectos',
  FORBIDDEN: 'No tienes permisos para esta acción',
  NOT_FOUND: 'No encontrado',
  CONFLICT: 'El registro ya existe',
  VALIDATION_ERROR: 'Los datos ingresados no son válidos',
  GENERIC_ERROR: 'Ocurrió un error. Intenta de nuevo.'
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Bienvenido',
  REGISTER_SUCCESS: 'Usuario creado correctamente',
  CLIENTE_CREATED: 'Cliente creado correctamente',
  CLIENTE_UPDATED: 'Cliente actualizado correctamente',
  CLIENTE_DELETED: 'Cliente eliminado correctamente',
  OPERATION_SUCCESS: 'Operación realizada correctamente'
} as const;

export const THEME_COLORS = {
  PRIMARY: '#34495e',
  PRIMARY_DARK: '#2c3e50',
  SECONDARY: '#ecf0f1',
  SUCCESS: '#27ae60',
  ERROR: '#e74c3c',
  WARNING: '#f39c12',
  INFO: '#3498db',
  LIGHT: '#ecf0f1',
  DARK: '#2c3e50',
  TEXT_PRIMARY: '#2c3e50',
  TEXT_SECONDARY: '#7f8c8d',
  BORDER: '#bdc3c7'
} as const;

export const TIMEOUTS = {
  SNACKBAR: 5000,
  DEBOUNCE: 300,
  REQUEST: 30000,
  REDIRECT: 2000
} as const;

export const DEFAULTS = {
  PAGINATION_LIMIT: 10,
  AVATAR_SIZE: 'large' as const,
  DRAWER_WIDTH: 280
} as const;

export const SEXO_OPTIONS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' }
] as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTRO] as const;

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.CONSULTA_CLIENTES,
  ROUTES.MANTENIMIENTO_CLIENTES,
  ROUTES.MANTENIMIENTO_CLIENTES_EDIT
] as const;
