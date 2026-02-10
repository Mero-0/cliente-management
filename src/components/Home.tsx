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
import PeopleIcon from "@material-ui/icons/People";
import { AuthContext } from "../context/AuthContext";
import { DrawerContext } from "../context/DrawerContext";
import NavBar from "./NavBar";
import { ROUTES } from "../constants/constants";
import { logger } from "../utils/logger";
import HomeStyles from "../styles/HomeStyles";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);

  if (!drawerContext) {
    throw new Error("DrawerContext must be used within DrawerProvider");
  }

  const { isExpanded } = drawerContext;
  const classes = HomeStyles({ isExpanded });

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
