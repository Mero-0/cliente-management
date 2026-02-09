import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@material-ui/core';
import { AuthContext } from './context/AuthContext';
import { DrawerProvider } from './context/DrawerContext';
import { ROUTES } from './constants/constants';
import ErrorBoundary from './components/ErrorBoundary';
import { logger } from './utils/logger';

const Login = React.lazy(() => import('./components/Login'));
const Registro = React.lazy(() => import('./components/Registro'));
const Home = React.lazy(() => import('./components/Home'));
const ConsultaClientes = React.lazy(() => import('./components/ConsultaClientes'));
const MantenimientoClientes = React.lazy(() => import('./components/MantenimientoClientes'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated || false;

  if (!isAuthenticated) {
    logger.warn('Acceso denegado - no autenticado');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

interface IPublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<IPublicRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated || false;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  logger.info('App iniciado');

  return (
    <ErrorBoundary>
      <DrawerProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.REGISTRO}
              element={
                <PublicRoute>
                  <Registro />
                </PublicRoute>
              }
            />

            <Route
              path={ROUTES.HOME}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.CONSULTA_CLIENTES}
              element={
                <ProtectedRoute>
                  <ConsultaClientes />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.MANTENIMIENTO_CLIENTES}
              element={
                <ProtectedRoute>
                  <MantenimientoClientes />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.MANTENIMIENTO_CLIENTES_EDIT}
              element={
                <ProtectedRoute>
                  <MantenimientoClientes />
                </ProtectedRoute>
              }
            />

            <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} replace />} />

            <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          </Routes>
        </Suspense>
        </Router>
      </DrawerProvider>
    </ErrorBoundary>
  );
};

export default App;
