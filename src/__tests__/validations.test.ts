import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateLoginForm,
  validateRegisterForm,
  validateClienteForm,
  hasErrors
} from '../validations/validations';

describe('Validaciones', () => {
  describe('validateEmail', () => {
    it('debe validar email correcto', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('no debe validar email inválido', () => {
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('debe validar contraseña fuerte', () => {
      expect(validatePassword('Password123')).toBe(true);
      expect(validatePassword('MySecure1')).toBe(true);
    });

    it('no debe validar contraseña débil', () => {
      expect(validatePassword('password')).toBe(false);
      expect(validatePassword('PASSWORD')).toBe(false);
      expect(validatePassword('Password')).toBe(false);
      expect(validatePassword('Pass1')).toBe(false);
      expect(validatePassword('Password123456789012')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('debe validar teléfono válido', () => {
      expect(validatePhone('1234567890')).toBe(true);
      expect(validatePhone('+1-234-567-8900')).toBe(true);
    });

    it('no debe validar teléfono inválido', () => {
      expect(validatePhone('abcdefghij')).toBe(false);
      expect(validatePhone('12345678901234567890')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('debe validar nombre válido', () => {
      expect(validateName('Juan')).toBe(true);
      expect(validateName('María')).toBe(true);
    });

    it('no debe validar nombre inválido', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('a'.repeat(51))).toBe(false);
    });
  });

  describe('validateLoginForm', () => {
    it('debe retornar errores si campos están vacíos', () => {
      const errors = validateLoginForm('', '');
      expect(errors.username).toBeDefined();
      expect(errors.password).toBeDefined();
    });

    it('no debe retornar errores si campos son válidos', () => {
      const errors = validateLoginForm('user', 'password');
      expect(Object.keys(errors).length).toBe(0);
    });
  });

  describe('validateRegisterForm', () => {
    it('debe validar datos correctos', () => {
      const errors = validateRegisterForm(
        'user',
        'test@example.com',
        'Password123',
        'Password123'
      );
      expect(Object.keys(errors).length).toBe(0);
    });

    it('debe retornar error si email es inválido', () => {
      const errors = validateRegisterForm(
        'user',
        'invalid.email',
        'Password123',
        'Password123'
      );
      expect(errors.email).toBeDefined();
    });

    it('debe retornar error si contraseñas no coinciden', () => {
      const errors = validateRegisterForm(
        'user',
        'test@example.com',
        'Password123',
        'Password456'
      );
      expect(errors.confirmPassword).toBeDefined();
    });
  });

  describe('hasErrors', () => {
    it('debe retornar true si hay errores', () => {
      const errors = { name: 'Error' };
      expect(hasErrors(errors)).toBe(true);
    });

    it('debe retornar false si no hay errores', () => {
      const errors = {};
      expect(hasErrors(errors)).toBe(false);
    });
  });

  describe('validateClienteForm', () => {
    const validClienteData = {
      nombre: 'Juan',
      apellidos: 'Pérez',
      identificacion: '12345678',
      celular: '1234567890',
      otroTelefono: '',
      direccion: 'Calle 123',
      fNacimiento: '1990-01-01',
      fAfiliacion: '2022-01-01',
      sexo: 'M',
      resennaPersonal: 'Cliente regular',
      interesFK: 'id-interes'
    };

    it('debe validar cliente correcto', () => {
      const errors = validateClienteForm(validClienteData);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('debe retornar errores si campos requeridos están vacíos', () => {
      const invalidData = { ...validClienteData, nombre: '' };
      const errors = validateClienteForm(invalidData);
      expect(errors.nombre).toBeDefined();
    });

    it('debe validar longitud máxima de campos', () => {
      const invalidData = {
        ...validClienteData,
        nombre: 'a'.repeat(51)
      };
      const errors = validateClienteForm(invalidData);
      expect(errors.nombre).toBeDefined();
    });
  });
});
