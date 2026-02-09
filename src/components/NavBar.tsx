import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../context/AuthContext";
import { DrawerContext } from "../context/DrawerContext";
import SideDrawer from "./SideDrawer";
import { ROUTES } from "../constants/constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#34495e",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: "1.3rem",
    color: "white",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  username: {
    color: "#fff",
    fontWeight: 500,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logoutButton: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "#ecf0f1",
    },
  },
  navButtons: {
    display: "flex",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(0.5),
    },
  },
  navButton: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  menuButton: {
    color: "#fff",
    marginRight: theme.spacing(1),
  },
}));

interface INavBarProps {
  onNavigateHome: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ onNavigateHome }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { username, logout } = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!drawerContext) {
    throw new Error("DrawerContext must be used within DrawerProvider");
  }

  const { isExpanded, setIsExpanded } = drawerContext;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = (): void => {
    logout();
    handleMenuClose();
    navigate(ROUTES.LOGIN);
  };

  const handleHome = (): void => {
    onNavigateHome();
    navigate(ROUTES.HOME);
  };

  const handleClientes = (): void => {
    navigate(ROUTES.CONSULTA_CLIENTES);
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="abrir drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Gestión de Clientes
          </Typography>

          <Box className={classes.userSection}>
            <Typography variant="body2" className={classes.username}>
              {username}
            </Typography>
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              startIcon={<AccountCircleIcon />}
              className={classes.logoutButton}
            >
              Salir
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem className={classes.menuItem} onClick={handleLogout}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <SideDrawer
        isExpanded={isExpanded}
        onNavigateHome={handleHome}
        onNavigateClientes={handleClientes}
        onLogout={handleLogout}
        username={username || "Usuario"}
      />
    </>
  );
};

export default NavBar;
