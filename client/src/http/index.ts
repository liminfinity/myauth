import axios from 'axios'
import { AuthService } from '../services/AuthService';

export const API_URL = 'http://localhost:5000';

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config
}, async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const user = await AuthService.refresh();
            if (user) {
                return $api.request(originalRequest)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    throw err;
})