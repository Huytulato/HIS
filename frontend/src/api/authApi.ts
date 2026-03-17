import axiosClient from './axiosClient';
import type { LoginRequest, SignupRequest, JwtResponse } from '../types/auth.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await axiosClient.post('/api/auth/login', data);
    return response.data;
  },
  register: async (data: SignupRequest): Promise<any> => {
    const response = await axiosClient.post('/api/auth/register', data);
    return response.data;
  },
  logout: async (): Promise<any> => {
    const response = await axiosClient.post('/api/auth/logout');
    return response.data;
  },
};