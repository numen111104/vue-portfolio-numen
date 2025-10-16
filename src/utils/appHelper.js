const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || '/';
};

export const appHelper = {
  url: {
    base: getApiBaseUrl(),
  },
};
