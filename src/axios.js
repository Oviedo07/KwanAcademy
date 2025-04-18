import axios from 'axios';

// Configurar la URL base para todas las peticiones
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  // Si usas proxy en package.json, puedes simplemente usar:
  // baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores de forma global
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error.message);
    return Promise.reject(error);
  }
);

export default instance;