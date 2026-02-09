import { useState, useCallback } from 'react';
import { FormErrors } from '../types/types';

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void> | void,
  validate?: (values: T) => FormErrors
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = event.target;
      const newValue = type === 'checkbox' ? (event.target as any).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: newValue
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined
        }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = event.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true
      }));

      if (validate) {
        const fieldErrors = validate(values);
        setErrors(fieldErrors);
      }
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (validate) {
        const formErrors = validate(values);
        setErrors(formErrors);

        if (Object.values(formErrors).some((err) => err !== undefined)) {
          return;
        }
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error en submit:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, validate]
  );

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setFieldError = useCallback((name: string, error: string | undefined) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    setErrors,
    setTouched
  };
};

export default useForm;
