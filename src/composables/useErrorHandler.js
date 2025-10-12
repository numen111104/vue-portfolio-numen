import { ref } from 'vue';

export function useErrorHandler() {
  const errors = ref({});

  const processErrors = (error) => {
    if (error.response && error.response.status === 422 && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error('An unexpected error occurred:', error);
    }
  };

  const clearErrors = () => {
    errors.value = {};
  };

  const getError = (field) => {
    return errors.value[field] || [];
  };

  return { errors, processErrors, clearErrors, getError };
}
