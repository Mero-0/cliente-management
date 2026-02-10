import React from 'react';
import { Box, Container, Typography, Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { logger } from '../utils/logger';
import ErrorBoundaryStyles from '../styles/ErrorBoundaryStyles';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

static getDerivedStateFromError(): Partial<IErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });

    logger.error('Error capturado por Error Boundary', {
      message: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{
  error: Error | null;
  onReset: () => void;
}> = ({ error, onReset }) => {
  const classes = ErrorBoundaryStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <ErrorIcon className={classes.icon} />
        <Typography variant="h4" className={classes.title}>
          Algo salió mal
        </Typography>
        <Typography variant="body1" className={classes.description}>
          Disculpa, ocurrió un error inesperado. Intenta recargar la página o contacta al soporte.
        </Typography>

        {process.env.NODE_ENV === 'development' && error && (
          <Box className={classes.details}>
            <strong>Error en desarrollo:</strong>
            <br />
            {error.toString()}
            <br />
            <br />
            <strong>Stack trace:</strong>
            <br />
            {error.stack}
          </Box>
        )}

        <Button variant="contained" className={classes.button} onClick={onReset}>
          Intentar de Nuevo
        </Button>
      </Container>
    </Box>
  );
};

export default ErrorBoundary;
export { ErrorBoundary };
