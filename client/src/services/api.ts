import axios from 'axios';

// Base Axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('carsaga_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401s (Token expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to auth if unauthorized
      localStorage.removeItem('carsaga_token');
      // Force reload or redirect via window to clear state
      if (window.location.pathname !== '/sign-in' && window.location.pathname !== '/register') {
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
