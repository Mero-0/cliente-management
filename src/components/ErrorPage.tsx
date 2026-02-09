import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { ROUTES } from '../constants/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ecf0f1'
  },
  container: {
    textAlign: 'center',
    padding: theme.spacing(4)
  },
  icon: {
    fontSize: '5rem',
    color: '#e74c3c',
    marginBottom: theme.spacing(2)
  },
  title: {
    color: '#2c3e50',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  description: {
    color: '#7f8c8d',
    marginBottom: theme.spacing(3)
  },
  button: {
    backgroundColor: '#34495e',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#2c3e50'
    }
  }
}));

const ErrorPage: React.FC = () => {
  const classes = useStyles();
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
