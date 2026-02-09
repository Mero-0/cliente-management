import React, {
  createContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { ClienteState, ClienteAction, Cliente, Interes } from "../types/types";
import { logger } from "../utils/logger";

const initialState: ClienteState = {
  clientes: [],
  clienteSeleccionado: null,
  intereses: [],
  loading: false,
  error: null,
  successMessage: null,
};

const clienteReducer = (
  state: ClienteState,
  action: ClienteAction,
): ClienteState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case "SET_CLIENTES":
      return {
        ...state,
        clientes: action.payload,
        loading: false,
        error: null,
      };
    case "SET_CLIENTE_SELECCIONADO":
      return {
        ...state,
        clienteSeleccionado: action.payload,
        loading: false,
      };
    case "SET_INTERESES":
      return {
        ...state,
        intereses: action.payload,
        loading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        successMessage: action.payload,
        loading: false,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        error: null,
        successMessage: null,
      };
    case "CLEAR_CLIENTE_SELECCIONADO":
      return {
        ...state,
        clienteSeleccionado: null,
      };
    default:
      return state;
  }
};

export const ClienteContext = createContext<any>(null);

interface IClienteProviderProps {
  children: ReactNode;
}

export const ClienteProvider: React.FC<IClienteProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(clienteReducer, initialState);

  const setLoading = useCallback(() => {
    dispatch({ type: "SET_LOADING" });
  }, []);

  const setClientes = useCallback((clientes: Cliente[]) => {
    dispatch({ type: "SET_CLIENTES", payload: clientes });
    logger.debug("Clientes cargados", { count: clientes.length });
  }, []);

  const setClienteSeleccionado = useCallback((cliente: Cliente | null) => {
    dispatch({ type: "SET_CLIENTE_SELECCIONADO", payload: cliente });
    if (cliente) {
      logger.debug("Cliente seleccionado", { clienteId: cliente.id });
    }
  }, []);

  const setIntereses = useCallback((intereses: Interes[]) => {
    dispatch({ type: "SET_INTERESES", payload: intereses });
    logger.debug("Intereses cargados", { count: intereses.length });
  }, []);

  const setError = useCallback((error: string | null) => {
    if (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      logger.warn("Error en clientes", { error });
    }
  }, []);

  const setSuccess = useCallback((message: string) => {
    dispatch({ type: "SET_SUCCESS", payload: message });
    logger.info("Operación exitosa", { message });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  const clearClienteSeleccionado = useCallback(() => {
    dispatch({ type: "CLEAR_CLIENTE_SELECCIONADO" });
  }, []);

  const value = {
    ...state,
    setLoading,
    setClientes,
    setClienteSeleccionado,
    setIntereses,
    setError,
    setSuccess,
    clearMessages,
    clearClienteSeleccionado,
  };

  return (
    <ClienteContext.Provider value={value}>{children}</ClienteContext.Provider>
  );
};

export default ClienteProvider;
