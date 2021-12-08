import axios from 'axios';
import cookie from 'react-cookies';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 300000,
});

instance.interceptors.request.use((config) => {
    const access_token = cookie.load('access_token')
    if(access_token) {
        config.headers.access_token = access_token;
    }
    return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;