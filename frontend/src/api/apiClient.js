import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v4',
  headers: {
    'Content-Type': 'application/json'
  }
});

// CRITICAL: This attaches your 'ukuqala_token' to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ukuqala_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;