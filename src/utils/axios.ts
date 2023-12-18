import axios from 'axios';
import {API_BASE_URL} from 'react-native-dotenv';
import {authStore} from './auth';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = authStore.getState().authResult?.idToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {axiosInstance as axios};
