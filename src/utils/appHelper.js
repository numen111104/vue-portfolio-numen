const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  return `${baseUrl}/api`;
};

export const appHelper = {
  url: {
    base: getApiBaseUrl(),
  },
};
