import React, {
  createContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { STORAGE_KEYS } from "../constants/constants";
import { AuthState, AuthAction } from "../types/types";
import { logger } from "../utils/logger";

const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
  userId: localStorage.getItem(STORAGE_KEYS.USER_ID) || null,
  username: localStorage.getItem(STORAGE_KEYS.USERNAME) || null,
  isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userid,
        username: action.payload.username,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        username: null,
        isAuthenticated: false,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<any>(null);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(
    (token: string, userid: string, username: string) => {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_ID, userid);
      localStorage.setItem(STORAGE_KEYS.USERNAME, username);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, userid, username },
      });

      logger.info("Usuario logueado", { username });
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USERNAME);

    dispatch({ type: "LOGOUT" });

    logger.info("Usuario deslogueado");
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      dispatch({ type: "LOGIN_START" });
    }
  }, []);

  const setError = useCallback((error: string | null) => {
    if (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error });
      logger.warn("Error de autenticación", { error });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value = {
    ...state,
    login,
    logout,
    setLoading,
    setError,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
