// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const axiosInstance = axios.create({
// .. where we make our configurations
    // baseURL: 'http://localhost:8080'
    baseURL: process.env.REACT_APP_SERVER_URL
});

export default axiosInstance;