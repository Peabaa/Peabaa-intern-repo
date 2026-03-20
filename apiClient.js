import axios from 'axios';

// Set up the base instance with requirements
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // A free fake API for testing
  timeout: 5000, // Fails if the request takes longer than 5 seconds
  headers: {
    Accept: '*/*',
  },
});

// Add the Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }; // Copy config to avoid mutating parameters directly (Clean Code)

    // Generate a dynamic Request ID
    newConfig.headers['X-Request-ID'] = crypto.randomUUID();

    // Check for an auth token (ensure window exists in case this runs in Node instead of a browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
