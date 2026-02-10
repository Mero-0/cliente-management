import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#ecf0f1",
    paddingBottom: theme.spacing(4),
    transition: "margin-left 0.3s ease",
    marginLeft: (props: { isExpanded: boolean }) =>
      props.isExpanded ? "280px" : "80px",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: theme.spacing(3),
    color: "#2c3e50",
    fontWeight: 600,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: "#34495e",
    fontWeight: 600,
    borderBottom: "2px solid #34495e",
    paddingBottom: theme.spacing(1),
  },
  imagePreview: {
    marginTop: theme.spacing(2),
    width: "100%",
    maxWidth: 200,
  },
  asterisk: {
    color: "red",
    marginLeft: "4px",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#34495e",
    color: "#fff",
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#2c3e50",
    },
  },
  cancelButton: {
    color: "#34495e",
    borderColor: "#34495e",
  },
}));