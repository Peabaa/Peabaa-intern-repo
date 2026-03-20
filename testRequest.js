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
