import axios from 'axios';
import { getAccessToken, getRefreshToken } from '../utils/token';
import { useAuthStore } from '../store/useAuthStore';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url !== '/api/auth/login' && error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosClient(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const res = await axios.post('http://localhost:8080/api/auth/refreshtoken', { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = res.data;
            useAuthStore.getState().setNewToken(accessToken, newRefreshToken);
            processQueue(null, accessToken);
            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            return axiosClient(originalRequest);
          } catch (err) {
            processQueue(err, null);
            useAuthStore.getState().logout();
            window.location.href = '/login';
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        } else {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;