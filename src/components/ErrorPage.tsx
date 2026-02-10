import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { ROUTES } from '../constants/constants';
import ErrorPageStyles from '../styles/ErrorPageStyles';

const ErrorPage: React.FC = () => {
  const classes = ErrorPageStyles();
  const navigate = useNavigate();

  const handleReturn = (): void => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <ErrorIcon className={classes.icon} />
        <Typography variant="h3" className={classes.title}>
          404 - Página no encontrada
        </Typography>
        <Typography variant="body1" className={classes.description}>
          La página que buscas no existe. Por favor, regresa al inicio.
        </Typography>
        <Button variant="contained" className={classes.button} onClick={handleReturn}>
          Volver al Inicio
        </Button>
      </Container>
    </Box>
  );
};

export default ErrorPage;
