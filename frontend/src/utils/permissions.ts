// utils/permissions.util.ts
import type { AuthUser } from "../types/auth.type";

export function isAdmin(user: AuthUser | null) {
  return user?.role === "admin";
}

export function isStaff(user: AuthUser | null) {
  return user?.role === "admin" || user?.role === "mod";
}
