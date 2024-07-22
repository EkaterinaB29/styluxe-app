import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://88.200.63.148:8211/api',
});

instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return err.message;
  }
);

export default instance;