import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './context/AuthContext';
import { ClienteProvider } from './context/ClienteContext';
import { theme } from './theme/theme';
import App from './App';
import { logger } from './utils/logger';

logger.info('Iniciando aplicación');

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ClienteProvider>
          <App />
        </ClienteProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
