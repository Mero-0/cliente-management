import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthState } from '../types/types';

export const useAuth = (): AuthState & {
  login: (token: string, userId: string, username: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
} => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context as any;
};

export default useAuth;
