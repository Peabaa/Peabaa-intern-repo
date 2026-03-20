# Reflection

## Code Examples:

### **apiClient.js**

```javascript
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
```

### **testRequest.js**

```javascript
/* eslint-disable no-console */

import axios from 'axios';
// eslint-disable-next-line import/extensions
import apiClient from './apiClient.js';

async function makeTestRequest() {
  // Initialize the AbortController for this specific request
  const controller = new AbortController();

  const postData = {
    title: 'Internship Issue on Axios',
    body: 'Testing Axios Interceptors',
    userId: 1,
  };

  try {
    console.log('Sending request...');

    // Send the POST request with parameters and the abort signal
    const response = await apiClient.post('/posts', postData, {
      signal: controller.signal,
    });

    console.log('Success! Response Data:', response.data);

    // Handle the redirect requirement
    if (typeof window !== 'undefined') {
      console.log('Redirecting to dashboard...');
      window.location.href = '/dashboard';
    }
  } catch (error) {
    // Properly handle different types of errors
    if (axios.isCancel(error)) {
      console.log('The request was manually aborted.');
    } else if (error.code === 'ECONNABORTED') {
      console.error('The request timed out. The server took too long.');
    } else {
      console.error('API Error:', error.message);
    }
  }
}

// Execute the test
makeTestRequest();
```

### **Response:** This was done using Node in the integrated terminal

```json
Sending request...
Success! Response Data: {
  title: 'Internship Issue on Axios',
  body: 'Testing Axios Interceptors',
  userId: 1,
  id: 101
}
```

### Why is it useful to create a reusable Axios instance?

Creating a reusable Axios instance follows the DRY (Don't Repeat Yourself) principle. By centralizing the `baseURL`, request timeouts, and default headers in one single file (`apiClient.js`), it ensures that every API call across the application is configured consistently. If the backend API URL ever changes, it only needs to be updated in this one file rather than hunting down and modifying hundreds of individual requests throughout the codebase.

### How does intercepting requests help with authentication?

Request interceptors act like an automated middleware or "tollbooth" for all outgoing network requests. Instead of manually writing the logic to fetch an authentication token from local storage and attach it to the headers for every single API call, the interceptor handles it automatically in the background. This keeps the frontend component code much cleaner and focused purely on handling data, while ensuring no secure requests accidentally leave the app without the proper authorization badge.

### What happens if an API request times out, and how can you handle it?

If a request takes longer than the configured limit (e.g., 5 seconds), Axios will forcefully abort the request to prevent the user's application from hanging indefinitely on a loading screen. When it aborts, Axios throws a specific error with the code `ECONNABORTED`. This can be handled by catching that specific error code in a `try/catch` block and displaying a graceful, user-friendly UI notification, such as "Connection timed out, please check your internet and try again."
