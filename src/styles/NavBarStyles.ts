import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
  menuButton: {
    color: "#fff",
    marginRight: theme.spacing(1),
  },
}));