import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS } from "../constants/constants";
import { CreateClienteData, UpdateClienteData } from "../types/types";
import { logger } from "../utils/logger";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    const startTime = performance.now();
    (config as any).startTime = startTime;
    return config;
  },
  (error) => {
    logger.error("Error en request interceptor", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    const startTime = (response.config as any).startTime;
    if (startTime) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      logger.apiCall(
        response.config.method?.toUpperCase() || "GET",
        response.config.url || "",
        response.status,
        duration,
      );
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.config) {
      const startTime = (error.config as any).startTime;
      if (startTime) {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        logger.apiCall(
          error.config.method?.toUpperCase() || "GET",
          error.config.url || "",
          error.response?.status,
          duration,
        );
      }
    }
    logger.error("Error en API call", error);
    return Promise.reject(error);
  },
);

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      logger.error("Login failed", error);
      throw error;
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.REGISTER, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      logger.error("Register failed", error);
      throw error;
    }
  },
};

export const clienteService = {
  listar: async (
    identificacion: string = "",
    nombre: string = "",
    usuarioId: string,
  ) => {
    try {
      const response = await api.post(ENDPOINTS.CLIENTE.LISTADO, {
        identificacion: identificacion || "",
        nombre: nombre || "",
        usuarioId,
      });
      return response;
    } catch (error) {
      logger.error("Error listing clientes", error);
      throw error;
    }
  },

  obtener: async (idCliente: string) => {
    try {
      const response = await api.get(
        `${ENDPOINTS.CLIENTE.OBTENER}/${idCliente}`,
      );
      return response;
    } catch (error) {
      logger.error("Error fetching cliente", error);
      throw error;
    }
  },

  crear: async (cliente: CreateClienteData) => {
    try {
      const response = await api.post(ENDPOINTS.CLIENTE.CREAR, cliente);
      return response;
    } catch (error) {
      logger.error("Error creating cliente", error);
      throw error;
    }
  },

  actualizar: async (cliente: UpdateClienteData) => {
    try {
      const response = await api.post(ENDPOINTS.CLIENTE.ACTUALIZAR, cliente);
      return response;
    } catch (error) {
      logger.error("Error updating cliente", error);
      throw error;
    }
  },

  eliminar: async (idCliente: string) => {
    try {
      const response = await api.delete(
        `${ENDPOINTS.CLIENTE.ELIMINAR}/${idCliente}`,
      );
      return response;
    } catch (error) {
      logger.error("Error deleting cliente", error);
      throw error;
    }
  },
};

export const interesesService = {
  listar: async () => {
    try {
      const response = await api.get(ENDPOINTS.INTERESES.LISTADO);
      return response;
    } catch (error) {
      logger.error("Error listing intereses", error);
      throw error;
    }
  },
};

export default api;
