import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1/admin'; // Corrected to use existing user API endpoint

const adminApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
adminApi.interceptors.request.use(
  (config) => {
    // No need to manually add token here as we are relying on HTTP-only cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // No need to remove token from localStorage as we are relying on HTTP-only cookies
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default adminApi; 