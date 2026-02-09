import { useContext } from 'react';
import { ClienteContext } from '../context/ClienteContext';
import { ClienteState, Cliente } from '../types/types';

export const useCliente = (): ClienteState & {
  setLoading: () => void;
  setClientes: (clientes: Cliente[]) => void;
  setClienteSeleccionado: (cliente: Cliente | null) => void;
  setIntereses: (intereses: any[]) => void;
  setError: (error: string | null) => void;
  setSuccess: (message: string) => void;
  clearMessages: () => void;
  clearClienteSeleccionado: () => void;
} => {
  const context = useContext(ClienteContext);

  if (!context) {
    throw new Error('useCliente debe ser usado dentro de un ClienteProvider');
  }

  return context as any;
};

export default useCliente;
