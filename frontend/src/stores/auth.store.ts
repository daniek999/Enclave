// stores/auth.store.ts
import { create } from "zustand";
import type { AuthUser } from "../types/auth.type";

interface AuthStore {
  token: string | null;
  user: AuthUser | null;

  setAuth: (token: string, user: AuthUser) => void;
  loadAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      token,
      user,
    });
  },

  loadAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    set({
      token,
      user: user ? JSON.parse(user) : null,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));
