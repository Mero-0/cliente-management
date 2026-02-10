import { REGEX, VALIDATION_MESSAGES, FIELD_VALIDATION } from '../constants/constants';
import { FormErrors } from '../types/types';

export const validateEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email);
};

export const validatePassword = (password: string): boolean => {
  return REGEX.PASSWORD.test(password);
};

export const validateMatch = (value1: string, value2: string): boolean => {
  return value1 === value2;
};

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const validateMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const validatePhone = (phone: string): boolean => {
  return phone.trim().length > 0 && phone.length <= FIELD_VALIDATION.TELEFONO.MAX;
};

export const validateName = (name: string): boolean => {
  return (
    name.trim().length >= FIELD_VALIDATION.NAME.MIN &&
    name.length <= FIELD_VALIDATION.NAME.MAX
  );
};

export const validateApellidos = (apellidos: string): boolean => {
  return (
    apellidos.trim().length >= FIELD_VALIDATION.APELLIDOS.MIN &&
    apellidos.length <= FIELD_VALIDATION.APELLIDOS.MAX
  );
};

export const validateIdentificacion = (id: string): boolean => {
  return (
    id.trim().length > 0 &&
    id.length <= FIELD_VALIDATION.IDENTIFICACION.MAX
  );
};

export const validateDireccion = (direccion: string): boolean => {
  return (
    direccion.trim().length > 0 &&
    direccion.length <= FIELD_VALIDATION.DIRECCION.MAX
  );
};

export const validateResena = (resena: string): boolean => {
  return (
    resena.trim().length > 0 &&
    resena.length <= FIELD_VALIDATION.RESENA.MAX
  );
};

export const validateSexo = (sexo: string): boolean => {
  return REGEX.SEXO.test(sexo);
};

export const validateDate = (fecha: string): boolean => {
  if (!fecha) return false;
  const date = new Date(fecha);
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateLoginForm = (
  username: string,
  password: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!username.trim()) {
    errors.username = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!password.trim()) {
    errors.password = VALIDATION_MESSAGES.REQUIRED;
  }

  return errors;
};

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!username.trim()) {
    errors.username = VALIDATION_MESSAGES.REQUIRED;
  }

  if (!email.trim()) {
    errors.email = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateEmail(email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  if (!password) {
    errors.password = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validatePassword(password)) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_WEAK;
  }

  if (!confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateMatch(password, confirmPassword)) {
    errors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_MISMATCH;
  }

  return errors;
};

export const validateClienteForm = (clienteData: any): FormErrors => {
  const errors: FormErrors = {};

  if (!clienteData.nombre?.trim()) {
    errors.nombre = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateName(clienteData.nombre)) {
    errors.nombre = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.NAME.MAX);
  }

  if (!clienteData.apellidos?.trim()) {
    errors.apellidos = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateApellidos(clienteData.apellidos)) {
    errors.apellidos = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.APELLIDOS.MAX);
  }

  if (!clienteData.identificacion?.trim()) {
    errors.identificacion = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateIdentificacion(clienteData.identificacion)) {
    errors.identificacion = VALIDATION_MESSAGES.MAX_LENGTH(
      FIELD_VALIDATION.IDENTIFICACION.MAX
    );
  }

  if (!clienteData.celular?.trim()) {
    errors.celular = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validatePhone(clienteData.celular)) {
    errors.celular = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.TELEFONO.MAX);
  }

  if (clienteData.otroTelefono && !validatePhone(clienteData.otroTelefono)) {
    errors.otroTelefono = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.TELEFONO.MAX);
  }

  if (!clienteData.direccion?.trim()) {
    errors.direccion = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateDireccion(clienteData.direccion)) {
    errors.direccion = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.DIRECCION.MAX);
  }

  if (!clienteData.fNacimiento) {
    errors.fNacimiento = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateDate(clienteData.fNacimiento)) {
    errors.fNacimiento = VALIDATION_MESSAGES.INVALID_DATE;
  }

  if (!clienteData.fAfiliacion) {
    errors.fAfiliacion = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateDate(clienteData.fAfiliacion)) {
    errors.fAfiliacion = VALIDATION_MESSAGES.INVALID_DATE;
  }

  if (!clienteData.sexo) {
    errors.sexo = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateSexo(clienteData.sexo)) {
    errors.sexo = VALIDATION_MESSAGES.INVALID_FORMAT;
  }

  if (!clienteData.resennaPersonal?.trim()) {
    errors.resennaPersonal = VALIDATION_MESSAGES.REQUIRED;
  } else if (!validateResena(clienteData.resennaPersonal)) {
    errors.resennaPersonal = VALIDATION_MESSAGES.MAX_LENGTH(FIELD_VALIDATION.RESENA.MAX);
  }

  if (!clienteData.interesFK) {
    errors.interesFK = VALIDATION_MESSAGES.REQUIRED;
  }

  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== null);
};
