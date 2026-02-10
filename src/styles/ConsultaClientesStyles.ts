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
  header: {
    marginBottom: theme.spacing(3),
    color: "#2c3e50",
    fontWeight: 600,
  },
  filterSection: {
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: "8px",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  tableHeader: {
    backgroundColor: "#34495e",
    "& th": {
      color: "#fff",
      fontWeight: 600,
    },
  },
  actionButton: {
    marginLeft: theme.spacing(1),
  },
  addButton: {
    backgroundColor: "#27ae60",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#229954",
    },
    marginLeft: theme.spacing(2),
  },
}));