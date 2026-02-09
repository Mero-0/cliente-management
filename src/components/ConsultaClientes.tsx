import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Snackbar,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { AuthContext } from "../context/AuthContext";
import { DrawerContext } from "../context/DrawerContext";
import { ClienteContext } from "../context/ClienteContext";
import { clienteService } from "../services/api";
import { interesesService } from "../services/api";
import NavBar from "./NavBar";
import { ROUTES } from "../constants/constants";
import { Cliente } from "../types/types";
import { logger } from "../utils/logger";

const useStyles = makeStyles((theme) => ({
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
  },
}));

const ConsultaClientes: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);
  const {
    clientes,
    loading,
    error,
    successMessage,
    setClientes,
    setIntereses,
    setError,
    setSuccess,
    clearMessages,
  } = useContext(ClienteContext);

  if (!drawerContext) {
    throw new Error("DrawerContext must be used within DrawerProvider");
  }

  const { isExpanded } = drawerContext;
  const classes = useStyles({ isExpanded });

  const [identificacion, setIdentificacion] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadClientes();
    loadIntereses();
    logger.info("ConsultaClientes página montada");
  }, []);

  const loadClientes = async (): Promise<void> => {
    if (!userId) return;

    try {
      const response = await clienteService.listar(
        identificacion,
        nombre,
        userId,
      );
      setClientes(response.data || []);
      logger.info("Clientes cargados", { count: response.data?.length || 0 });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al cargar clientes";
      setError(errorMessage);
      logger.error("Error al cargar clientes", { error: errorMessage });
    }
  };

  const loadIntereses = async (): Promise<void> => {
    try {
      const response = await interesesService.listar();
      setIntereses(response.data || []);
    } catch (err: any) {
      logger.warn("Error al cargar intereses", err);
    }
  };

  const handleSearch = async (): Promise<void> => {
    if (!userId) return;

    try {
      const response = await clienteService.listar(
        identificacion,
        nombre,
        userId,
      );
      setClientes(response.data || []);
      logger.info("Búsqueda ejecutada", { identificacion, nombre });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error en búsqueda";
      setError(errorMessage);
    }
  };

  const handleOpenDeleteDialog = (cliente: Cliente): void => {
    setClienteToDelete(cliente);
    setOpenDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDialog(false);
    setClienteToDelete(null);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!clienteToDelete) return;

    setDeleting(true);
    try {
      await clienteService.eliminar(clienteToDelete.id);
      setSuccess("Cliente eliminado correctamente");
      await loadClientes();
      handleCloseDeleteDialog();
      logger.info("Cliente eliminado", { clienteId: clienteToDelete.id });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al eliminar cliente";
      setError(errorMessage);
      logger.error("Error al eliminar cliente", { error: errorMessage });
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateCliente = (): void => {
    navigate(ROUTES.MANTENIMIENTO_CLIENTES);
  };

  const handleEditCliente = (cliente: Cliente): void => {
    navigate(`${ROUTES.MANTENIMIENTO_CLIENTES}/${cliente.id}`);
  };

  const handleNavigateHome = (): void => {
    navigate(ROUTES.HOME);
  };

  return (
    <Box
      className={classes.root}
      sx={{
        marginLeft: isExpanded ? { xs: "0", md: "280px" } : "0",
      }}
    >
      <NavBar onNavigateHome={handleNavigateHome} />

      <Container maxWidth="lg" className={classes.container}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <h1 className={classes.header}>Consulta de Clientes</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.addButton}
            onClick={handleCreateCliente}
          >
            Nuevo Cliente
          </Button>
        </Box>

        <Paper className={classes.filterSection}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identificación"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Buscar"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Identificación</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : clientes.length > 0 ? (
                clientes.map((cliente: Cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.identificacion}</TableCell>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.apellidos}</TableCell>
                    <TableCell>{cliente.telefonoCelular}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditCliente(cliente)}
                        className={classes.actionButton}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDeleteDialog(cliente)}
                        className={classes.actionButton}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay clientes para mostrar
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Eliminar Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar a {clienteToDelete?.nombre}{" "}
            {clienteToDelete?.apellidos}? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => clearMessages()}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={error}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={() => clearMessages()}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={successMessage}
      />
    </Box>
  );
};

export default ConsultaClientes;
