// apis/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3004/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((c) => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    c.headers.Authorization = `Bearer ${token}`;
  }
  return c;
});
