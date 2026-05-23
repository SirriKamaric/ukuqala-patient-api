import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v4',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Injects the token safely before the packet leaves
apiClient.interceptors.request.use(
  (config) => {
    // Aggressively scan all common token keys used across the app
    const token = localStorage.getItem('ukuqala_token') || 
                  localStorage.getItem('token') || 
                  localStorage.getItem('user');

    if (token) {
      config.headers = config.headers || {};
      // Handle cases where the token might be wrapped in quotes inside localStorage
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      config.headers['Authorization'] = `Bearer ${cleanToken}`;
    } else {
      // Diagnostic helper to alert you during development if keys are blank
      console.warn("API Client warning: No token detected in local storage keys.");
    }
    
    return config; // CRITICAL: This must be returned for Axios to proceed with the call
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catches 401s dynamically and boots to login safely
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("🔒 Security Event: 401 Unauthorized detected. Purging session...");
      // Wipe the stale or bad keys so the app stops loop-fetching with broken data
      localStorage.removeItem('ukuqala_token');
      localStorage.removeItem('token');
      
      // Force user back to login safely if they are sitting on a guarded page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;