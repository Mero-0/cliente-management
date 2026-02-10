import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Card,
  CardMedia,
} from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";
import { DrawerContext } from "../context/DrawerContext";
import { ClienteContext } from "../context/ClienteContext";
import { clienteService, interesesService } from "../services/api";
import NavBar from "./NavBar";
import { validateClienteForm } from "../validations/validations";
import { ROUTES, SEXO_OPTIONS } from "../constants/constants";
import {
  FormErrors,
  Cliente,
  Interes,
  CreateClienteData,
} from "../types/types";
import { logger } from "../utils/logger";
import { formatDateForInput } from "../utils/dateFormatter";
import MantenimientoClientesStyles from "../styles/MantenimientoClientesStyles";

const MantenimientoClientes: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { userId } = useContext(AuthContext);
  const drawerContext = useContext(DrawerContext);
  const { setSuccess, setError, clearMessages, intereses, setIntereses } =
    useContext(ClienteContext);

  if (!drawerContext) {
    throw new Error("DrawerContext must be used within DrawerProvider");
  }

  const { isExpanded } = drawerContext;
  const classes = MantenimientoClientesStyles({ isExpanded });

  const [formData, setFormData] = useState<Partial<CreateClienteData>>({
    nombre: "",
    apellidos: "",
    identificacion: "",
    celular: "",
    otroTelefono: "",
    direccion: "",
    fNacimiento: "",
    fAfiliacion: "",
    sexo: undefined,
    resennaPersonal: "",
    imagen: null,
    interesFK: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(id ? true : false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    loadIntereses();
    if (id) {
      loadCliente(id);
    } else {
      setFetching(false);
    }
  }, []);

  const loadIntereses = async (): Promise<void> => {
    try {
      const response = await interesesService.listar();
      setIntereses(response.data || []);
    } catch (err) {
      logger.warn("Error cargando intereses", err);
    }
  };

  const loadCliente = async (clienteId: string): Promise<void> => {
    try {
      const response = await clienteService.obtener(clienteId);
      const cliente: Cliente = response.data;

      setFormData({
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        identificacion: cliente.identificacion,
        celular: cliente.celular || cliente.telefonoCelular,
        otroTelefono: cliente.otroTelefono || "",
        direccion: cliente.direccion,
        fNacimiento: formatDateForInput(cliente.fNacimiento),
        fAfiliacion: formatDateForInput(cliente.fAfiliacion),
        sexo: cliente.sexo,
        resennaPersonal: cliente.resennaPersonal || cliente.resenaPersonal,
        imagen: cliente.imagen || null,
        interesFK: cliente.interesesId,
      });

      if (cliente.imagen) {
        setImagePreview(cliente.imagen);
      }

      logger.info("Cliente cargado para edición", { clienteId });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al cargar cliente";
      setError(errorMessage);
      logger.error("Error cargando cliente", { error: errorMessage });
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSelectChange = (event: any): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          imagen: result,
        }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formErrors = validateClienteForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    clearMessages();

    try {
      if (id) {
        await clienteService.actualizar({
          id,
          ...formData,
          usuarioId: userId,
          celular: formData.celular,
          resennaPersonal: formData.resennaPersonal,
        } as any);
        setSuccess("Cliente actualizado correctamente");
        logger.info("Cliente actualizado", { clienteId: id });
      } else {
        await clienteService.crear({
          ...formData,
          usuarioId: userId,
        } as CreateClienteData);
        setSuccess("Cliente creado correctamente");
        logger.info("Cliente creado");
      }

      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(ROUTES.CONSULTA_CLIENTES);
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error en la operación";
      setError(errorMessage);
      setOpenSnackbar(true);
      logger.error("Error en formulario cliente", { error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = (): void => {
    navigate(ROUTES.HOME);
  };

  if (fetching) {
    return (
      <Box className={classes.root}>
        <NavBar onNavigateHome={handleNavigateHome} />
        <Container className={classes.container}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <NavBar onNavigateHome={handleNavigateHome} />

      <Container maxWidth="md" className={classes.container}>
        <h1 className={classes.header}>
          {id ? "Editar Cliente" : "Nuevo Cliente"}
        </h1>

        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Box className={classes.section}>
              <h2 className={classes.sectionTitle}>Información Personal</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Nombre <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="nombre"
                    value={formData.nombre || ""}
                    onChange={handleInputChange}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Apellidos <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="apellidos"
                    value={formData.apellidos || ""}
                    onChange={handleInputChange}
                    error={!!errors.apellidos}
                    helperText={errors.apellidos}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Identificación{" "}
                        <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="identificacion"
                    value={formData.identificacion || ""}
                    onChange={handleInputChange}
                    error={!!errors.identificacion}
                    helperText={errors.identificacion}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.sexo}>
                    <InputLabel shrink>
                      Sexo <span className={classes.asterisk}>*</span>
                    </InputLabel>
                    <Select
                      name="sexo"
                      value={formData.sexo || ""}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="">Seleccione...</MenuItem>
                      {SEXO_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sexo && (
                      <FormHelperText>{errors.sexo}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Fecha de Nacimiento{" "}
                        <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="fNacimiento"
                    type="date"
                    value={formData.fNacimiento || ""}
                    onChange={handleInputChange}
                    error={!!errors.fNacimiento}
                    helperText={errors.fNacimiento}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Fecha de Afiliación{" "}
                        <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="fAfiliacion"
                    type="date"
                    value={formData.fAfiliacion || ""}
                    onChange={handleInputChange}
                    error={!!errors.fAfiliacion}
                    helperText={errors.fAfiliacion}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className={classes.section}>
              <h2 className={classes.sectionTitle}>Información de Contacto</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Teléfono Celular{" "}
                        <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="celular"
                    value={formData.celular || ""}
                    onChange={handleInputChange}
                    error={!!errors.celular}
                    helperText={errors.celular}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Otro Teléfono"
                    name="otroTelefono"
                    value={formData.otroTelefono || ""}
                    onChange={handleInputChange}
                    error={!!errors.otroTelefono}
                    helperText={errors.otroTelefono}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Dirección <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="direccion"
                    value={formData.direccion || ""}
                    onChange={handleInputChange}
                    error={!!errors.direccion}
                    helperText={errors.direccion}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className={classes.section}>
              <h2 className={classes.sectionTitle}>Información Adicional</h2>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={
                      <span>
                        Reseña Personal{" "}
                        <span className={classes.asterisk}>*</span>
                      </span>
                    }
                    name="resennaPersonal"
                    multiline
                    rows={4}
                    value={formData.resennaPersonal || ""}
                    onChange={handleInputChange}
                    error={!!errors.resennaPersonal}
                    helperText={errors.resennaPersonal}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.interesFK}>
                    <InputLabel shrink>
                      Intereses <span className={classes.asterisk}>*</span>
                    </InputLabel>
                    <Select
                      name="interesFK"
                      value={formData.interesFK || ""}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="">Seleccione un interés</MenuItem>
                      {intereses.map((interes: Interes) => (
                        <MenuItem key={interes.id} value={interes.id}>
                          {interes.descripcion}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.interesFK && (
                      <FormHelperText>{errors.interesFK}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                    label="Imagen"
                  />
                </Grid>
                {imagePreview && (
                  <Grid item xs={12}>
                    <Card className={classes.imagePreview}>
                      <CardMedia
                        component="img"
                        image={imagePreview}
                        alt="Preview"
                      />
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Box display="flex" mt={4}>
              <Button
                type="submit"
                variant="contained"
                className={classes.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Guardar"
                )}
              </Button>
              <Button
                variant="outlined"
                className={classes.cancelButton}
                onClick={() => navigate(ROUTES.CONSULTA_CLIENTES)}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message={errors.message}
      />
    </Box>
  );
};

export default MantenimientoClientes;
