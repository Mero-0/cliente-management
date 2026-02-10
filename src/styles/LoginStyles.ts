
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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