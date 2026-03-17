import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user.types';
import { clearTokens, setAccessToken, setRefreshToken } from '../utils/token';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setNewToken: (token: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token, refreshToken) => {
        setAccessToken(token);
        setRefreshToken(refreshToken);
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        clearTokens();
        set({ user: null, isAuthenticated: false });
      },
      setNewToken: (token, refreshToken) => {
        setAccessToken(token);
        setRefreshToken(refreshToken);
      },
    }),
    {
      name: 'auth-storage', // name of item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);