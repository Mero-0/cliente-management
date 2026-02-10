import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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