import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * Har request se pehle JWT token attach karega
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR (GLOBAL 401 HANDLER)
 * Agar token expire / invalid ho jaye
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Your session has expired. Please log in again.');

      // token clear
      localStorage.removeItem('token');

      // redirect to login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
