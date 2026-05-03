import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v4', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR: Attaches the token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Standard Bearer token format for your v4 backend
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Handles session expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the token is invalid, clear storage and send user back to login
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;