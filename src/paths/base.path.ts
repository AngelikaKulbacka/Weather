export const basePath = {
  origin: new URL('/', window.origin),
  base: '/',
  api: import.meta.env.VITE_API_ENDPOINT,
};
