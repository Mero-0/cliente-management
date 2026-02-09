import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';
import { validateRegisterForm } from '../validations/validations';
import { ROUTES, TIMEOUTS } from '../constants/constants';
import { FormErrors } from '../types/types';
import { logger } from '../utils/logger';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)'
  },
  title: {
    marginBottom: theme.spacing(3),
    color: '#2c3e50',
    fontWeight: 600
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#34495e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2c3e50'
    },
    textTransform: 'uppercase',
    fontWeight: 600
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  link: {
    color: '#34495e',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

const Registro: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [, setSnackbarSeverity] = useState<'success' | 'error'>('error');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const formErrors = validateRegisterForm(username, email, password, confirmPassword);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const response = await authService.register(username, email, password);

      setSuccessMessage(response.message || 'Usuario creado correctamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      logger.info('Registro exitoso', { username, email });

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, TIMEOUTS.REDIRECT);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrar el usuario';
      setApiError(errorMessage);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);

      logger.error('Registro falló', { username, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.title}>
          Registrarse
        </Typography>

        <form className={classes.form} onSubmit={handleRegister}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
            disabled={isLoading || loading}
          >
            {isLoading || loading ? <CircularProgress size={24} color="inherit" /> : 'REGISTRARSE'}
          </Button>
        </form>

        <Box className={classes.linkContainer}>
          <Typography variant="body2">
            ¿Ya tiene una cuenta?{' '}
            <Link to={ROUTES.LOGIN} className={classes.link}>
              Inicie sesión
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={TIMEOUTS.SNACKBAR}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={apiError || successMessage}
      />
        
    </Container>
  );
};

export default Registro;
