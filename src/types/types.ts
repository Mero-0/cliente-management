export interface AuthResponse {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthAction {
  type:
    | "LOGIN_START"
    | "LOGIN_SUCCESS"
    | "LOGIN_FAIL"
    | "LOGOUT"
    | "REGISTER_SUCCESS"
    | "SET_ERROR"
    | "CLEAR_ERROR";
  payload?: any;
}

export interface Cliente {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono?: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resenaPersonal: string;
  imagen?: string;
  interesesId: string;
}

export interface ClienteResumen {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

export interface CreateClienteData {
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: 'M' | 'F';
  resenaPersonal: string;
  imagen: string | null;
  interesFK: string;
  usuarioId: string;
}

export interface UpdateClienteData extends CreateClienteData {
  id: string;
  celular?: string;
  resennaPersonal?: string;
}

export interface ClienteFormData {
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resenaPersonal: string;
  imagen: string | null;
  interesFK: string;
  usuarioId?: string;
  id?: string;
  celular?: string;
  resennaPersonal?: string;
}

export interface Interes {
  id: string;
  descripcion: string;
}

export interface ClienteState {
  clientes: ClienteResumen[];
  clienteSeleccionado: Cliente | null;
  intereses: Interes[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface ClienteAction {
  type:
    | "SET_LOADING"
    | "SET_CLIENTES"
    | "SET_CLIENTE_SELECCIONADO"
    | "SET_INTERESES"
    | "SET_ERROR"
    | "SET_SUCCESS"
    | "CLEAR_MESSAGES"
    | "CLEAR_CLIENTE_SELECCIONADO";
  payload?: any;
}

export interface AuthContextType extends AuthState {
  login: (token: string, userid: string, username: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  setRegisterSuccess: () => void;
}

export interface ClienteContextType extends ClienteState {
  setLoading: () => void;
  setClientes: (clientes: ClienteResumen[]) => void;
  setClienteSeleccionado: (cliente: Cliente | null) => void;
  setIntereses: (intereses: Interes[]) => void;
  setError: (error: string) => void;
  setSuccess: (message: string) => void;
  clearMessages: () => void;
  clearClienteSeleccionado: () => void;
}

export interface FormErrors {
  [key: string]: string | null | undefined;
}

export interface FieldValidator {
  name: string;
  validate: (value: any) => string | null;
}

export interface ApiResponse<T = any> {
  status?: string;
  message?: string;
  data?: T;
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface SearchClientesRequest {
  identificacion?: string;
  nombre?: string;
  usuarioId: string;
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  error?: Error;
}

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  details?: any;
  timestamp: number;
}

export interface ErrorInfo {
  hasError: boolean;
  error: AppError | null;
  resetError: () => void;
}
