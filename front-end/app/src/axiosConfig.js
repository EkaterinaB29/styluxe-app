import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://88.200.63.148:8211/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;