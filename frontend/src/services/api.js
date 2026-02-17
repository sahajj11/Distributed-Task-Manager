import axios from 'axios';

// Create an instance of axios with a base configuration
const api = axios.create({
  // Update this URL if your backend is running on a different port/domain
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // We use the 'Bearer' scheme which is standard for JWT
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401, the token is likely expired or invalid
    if (error.response && error.response.status === 401) {
      console.error("Session expired. Redirecting to login...");
      localStorage.removeItem('token');
      // Optional: window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;