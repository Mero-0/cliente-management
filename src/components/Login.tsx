import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/api";
import { validateLoginForm } from "../validations/validations";
import { ROUTES, STORAGE_KEYS } from "../constants/constants";
import { FormErrors } from "../types/types";
import { logger } from "../utils/logger";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: theme.spacing(3),
    color: "#2c3e50",
    fontWeight: 600,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  checkboxContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#34495e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#2c3e50",
    },
    textTransform: "uppercase",
    fontWeight: 600,
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  link: {
    color: "#34495e",
    textDecoration: "none",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, loading, setLoading, setError, error, clearError } =
    useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const rememberedUsername = localStorage.getItem(
      STORAGE_KEYS.REMEMBERED_USERNAME,
    );
    const isRemembered =
      localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";

    if (isRemembered && rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }

    logger.info("Login página montada");
  }, []);

  const validateForm = (): boolean => {
    const formErrors = validateLoginForm(username, password);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    clearError();

    try {
      const response = await authService.login(username, password);
      const { token, userid, username: responseUsername } = response;

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
        localStorage.setItem(STORAGE_KEYS.REMEMBERED_USERNAME, username);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USERNAME);
      }

      login(token, userid, responseUsername);
      logger.info("Login exitoso", { username });
      navigate(ROUTES.HOME);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Usuario o contraseña incorrectos";
      setError(errorMessage);
      setOpenSnackbar(true);
      logger.error("Login falló", { username, error: errorMessage });
    }
  };

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.title}>
          Iniciar Sesión
        </Typography>

        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
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
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Box className={classes.checkboxContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Recuérdame"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "INICIAR SESIÓN"
            )}
          </Button>
        </form>

        <Box className={classes.linkContainer}>
          <Typography variant="body2">
            ¿No tiene una cuenta?{" "}
            <Link to={ROUTES.REGISTRO} className={classes.link}>
              Regístrese
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar || !!error}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={error}
      />
    </Container>
  );
};

export default Login;
