import { create } from 'zustand';
import { authService } from '../services/auth';

interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      set({ user: response.user, token: response.token });
    } catch (error: any) {
      set({ error: error.message || 'خطأ في تسجيل الدخول' });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (username: string, email: string, password: string, fullName: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ username, email, password, fullName });
      set({ user: response.user, token: response.token });
    } catch (error: any) {
      set({ error: error.message || 'خطأ في التسجيل' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },

  setUser: (user: User | null) => {
    set({ user });
  },
}));
