import apiClient from "./apiClient";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface MessageResponse {
  message: string;
  error?: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<MessageResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
