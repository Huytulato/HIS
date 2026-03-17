export interface JwtResponse {
  token: string;
  type: "Bearer";
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  role?: string[];
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
}