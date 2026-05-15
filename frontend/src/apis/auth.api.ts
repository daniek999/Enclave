// apis/auth.api.ts
import { api } from "./_axios";
import type { AuthResponse, LoginBody, RegisterBody } from "../types/auth.type";

export function authApi() {
  const login = async (body: LoginBody) => {
    const response = await api.post<AuthResponse>("/users/login", body);
    return response.data;
  };
  const register = async (body: RegisterBody) => {
    const response = await api.post<AuthResponse>("/users/register", body);
    return response.data;
  };

  return {
    login,
    register,
  };
}
