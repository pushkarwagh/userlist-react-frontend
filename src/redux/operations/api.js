import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
    
});

// API.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '---';
//   return config;
// });

export default API;