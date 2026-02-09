import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import { AuthContext } from "../context/AuthContext";
import { DrawerContext } from "../context/DrawerContext";
import NavBar from "./NavBar";
import { ROUTES } from "../constants/constants";
import { logger } from "../utils/logger";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#ecf0f1",
    transition: "margin-left 0.3s ease",
    marginLeft: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "280px" : "80px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  welcomeSection: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  welcomeText: {
    color: "#2c3e50",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  gridContainer: {
    marginTop: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "#34495e",
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    color: "#2c3e50",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  cardDescription: {
    color: "#7f8c8d",
    marginBottom: theme.spacing(2),
    fontSize: "0.95rem",
  },
  button: {
    backgroundColor: "#34495e",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#2c3e50",
    },
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);

  if (!drawerContext) {
    throw new Error("DrawerContext must be used within DrawerProvider");
  }

  const { isExpanded } = drawerContext;
  const classes = useStyles({ isExpanded });

  React.useEffect(() => {
    logger.info("Home página montada", { username });
  }, [username]);

  const handleNavigateClientes = (): void => {
    navigate(ROUTES.CONSULTA_CLIENTES);
  };

  const handleNavigateHome = (): void => {};

  return (
    <Box className={classes.root}>
      <NavBar onNavigateHome={handleNavigateHome} />

      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.welcomeSection}>
          <Typography variant="h4" className={classes.welcomeText}>
            ¡Bienvenido, {username}!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sistema de Gestión de Clientes
          </Typography>
        </Box>

        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.card}>
              <PeopleIcon className={classes.icon} />
              <Typography variant="h6" className={classes.cardTitle}>
                Gestionar Clientes
              </Typography>
              <Typography variant="body2" className={classes.cardDescription}>
                Accede al módulo de clientes para crear, editar, eliminar y
                consultar información de clientes.
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                fullWidth
                onClick={handleNavigateClientes}
              >
                Ir a Clientes
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
