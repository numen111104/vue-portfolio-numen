const getApiBaseUrl = () => {
  // In development, we use a relative path to go through the Vite proxy.
  // In production, we'll use the environment variable.
  return import.meta.env.VITE_API_URL || '/';
};

export const appHelper = {
  url: {
    // In our setup, both API and Auth routes are served from the same base URL.
    base: getApiBaseUrl(),
  },
};
