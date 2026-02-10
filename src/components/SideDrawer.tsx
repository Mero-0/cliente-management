import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SideDrawerStyles  from "../styles/SideDrawerStyles";
interface ISideDrawerProps {
  isExpanded: boolean;
  onNavigateHome: () => void;
  onNavigateClientes: () => void;
  onLogout: () => void;
  username?: string;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  isExpanded,
  onNavigateHome,
  onNavigateClientes,
  onLogout,
  username = "Usuario",
}) => {
  const classes = SideDrawerStyles({ isExpanded });

  const handleHome = (): void => {
    onNavigateHome();
  };

  const handleClientes = (): void => {
    onNavigateClientes();
  };

  const handleLogout = (): void => {
    onLogout();
  };

  const getInitials = (name: string): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts[0].charAt(0).toUpperCase();
  };

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.userSection}>
        <Avatar className={classes.avatar}>{getInitials(username)}</Avatar>
        <Typography variant="h6" className={classes.username}>
          {username}
        </Typography>
        <Typography variant="caption" className={classes.userLabel}>
          Usuario en sesión
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <List className={classes.list}>
        <ListItem button className={classes.listItem} onClick={handleHome}>
          <ListItemIcon className={classes.listItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" className={classes.listItemText} />
        </ListItem>

        <ListItem button className={classes.listItem} onClick={handleClientes}>
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" className={classes.listItemText} />
        </ListItem>
      </List>

      <Divider className={classes.divider} />

      <List className={classes.list}>
        <ListItem
          button
          className={`${classes.listItem} ${classes.logoutItem}`}
          onClick={handleLogout}
        >
          <ListItemIcon className={classes.logoutIcon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar Sesión"
            className={classes.logoutText}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideDrawer;
