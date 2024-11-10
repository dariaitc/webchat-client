import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // environment variable for base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // allows cookies to be included in cross-origin requests
});

// Interceptors to handle responses (e.g., for authentication or errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log the request URL and response message
      console.log('Request URL:', error.config.url);
      console.log('Response Message:', error.response.data || error.message);
      
      if (error.response.status === 401) {
        // Handle unauthorized response
        // Optionally redirect to login or trigger a session refresh
      }
    } else {
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;