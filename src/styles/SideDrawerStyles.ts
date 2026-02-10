import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    backgroundColor: "#34495e",
    color: "#fff",
    transition: "width 0.3s ease",
    overflowY: "auto",
    zIndex: 1000,
    width: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "280px" : "80px",
  },
  userSection: {
    padding: theme.spacing(2),
    backgroundColor: "#2c3e50",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "block" : "none",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "0 auto",
    marginBottom: theme.spacing(1),
    backgroundColor: "#27ae60",
    fontSize: "1.5rem",
  },
  username: {
    color: "#fff",
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    fontSize: "1rem",
  },
  userLabel: {
    color: "#bdc3c7",
    fontSize: "0.75rem",
  },
  list: {
    padding: 0,
  },
  listItem: {
    color: "#fff",
    justifyContent: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "flex-start" : "center",
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  listItemIcon: {
    color: "#bdc3c7",
    minWidth: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "56px" : "0",
    justifyContent: "center",
  },
  listItemText: {
    display: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "block" : "none",
    marginLeft: 0,
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      color: "#fff",
    },
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    display: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "block" : "none",
  },
  logoutItem: {
    color: "#e74c3c",
    "&:hover": {
      backgroundColor: "rgba(231, 76, 60, 0.1)",
    },
  },
  logoutIcon: {
    color: "#e74c3c",
    minWidth: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "56px" : "0",
    justifyContent: "center",
  },
  logoutText: {
    display: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "block" : "none",
    "& .MuiListItemText-primary": {
      color: "#e74c3c",
      fontWeight: 600,
    },
  },
}));
