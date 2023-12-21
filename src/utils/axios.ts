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

axiosInstance.interceptors.response.use(
  response => response,
  async err => {
    const request = err.config;

    if (err.response.status === 401 && !request._retry) {
      request._retry = true;

      try {
        await authStore.getState().refresh();
        return axiosInstance(request);
      } catch (e) {
        await authStore.getState().logout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  },
);

export {axiosInstance as axios};
