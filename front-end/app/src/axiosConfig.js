import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://88.200.63.148:8211/api',
  withCredentials: true, // Ensure cookies are sent with requests
});

export default instance;
