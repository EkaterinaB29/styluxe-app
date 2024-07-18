// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://88.200.63.148:8211/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
