import axios from 'axios';
import { redirect } from 'next/navigation';
import { getSession } from './auth/session.service';

export const authApi = axios.create({
  baseURL: 'https://reqres.in',
});

export const refreshTokenApi = axios.create({
  baseURL: 'http://localhost:3000/api/refresh',
  withCredentials: true,
});
refreshTokenApi.defaults.withCredentials = true;

export async function newApiInstance() {
  'use server';

  const axiosInstance = axios.create({
    baseURL: 'https://67aa117865ab088ea7e58c36.mockapi.io',
  });
  const session = await getSession();
  axiosInstance.interceptors.request.use((config) => {
    const token = session.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await refreshTokenApi.get('/');

          // Update Authorization header
          const { token } = refreshResponse.data;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // Retry original request with updated token
          return axiosInstance(originalRequest);
        } catch {
          return redirect('/login');
        }
      }
    }
  );

  return axiosInstance;
}
