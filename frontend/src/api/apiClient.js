import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v4',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(

  config => {

    const token =
      localStorage.getItem('ukuqala_token');

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  error => Promise.reject(error)
);

apiClient.interceptors.response.use(

  response => response,

  error => {

    console.log(
      'API ERROR:',
      error.response?.data ||
      error.message
    );

    // DO NOT redirect automatically
    return Promise.reject(error);
  }
);

export default apiClient;