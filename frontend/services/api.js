// frontend/services/api.js

import axios from 'axios';

// 1. Create a new Axios instance with a custom configuration
const api = axios.create({
  // 2. Set the "baseURL" for all requests made with this instance
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/*
  3. (Future-proofing step for later)
  This is where we will add our "interceptor" to automatically
  attach the user's login token to every single outgoing request.
  
  api.interceptors.request.use(config => {
    const token = //... get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
*/

// 4. Export the configured instance for use in other parts of our app
export default api;