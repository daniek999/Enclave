// types/user.type.ts
import type { Count, Pagination, Query } from "./common.type";

// Body Responses
export interface UserItem {
  id: number;
  username: string;
  role: "user" | "mod" | "admin";
  status: "active" | "suspended" | "banned";
  createdAt: string;
  updatedAt: string;
  posts: {
    id: number;
    title: string;
    createdAt: string;
  }[];
  comments: {
    id: number;
    content: string;
    createdAt: string;
  }[];
}
export interface UserUpdate {
  username?: string;
  password?: string;
  status?: "active" | "suspended" | "banned";
  role?: "user" | "mod" | "admin";
}
export interface UserCount extends Count {
  active: number;
  suspended: number;
  banned: number;
  user: number;
  mod: number;
  admin: number;
}
export interface UserSearch extends Query {
  role?: "user" | "mod" | "admin";
  status?: "active" | "suspended" | "banned";
}
export type UserPagination = Pagination;

// Type Responses
export interface UserListResponse {
  success: boolean;
  message: string;
  data: {
    items: UserItem[];
    counts: UserCount;
    pagination: UserPagination;
  };
}
export interface UserOneResponse {
  success: boolean;
  message: string;
  data: { item: UserItem };
}
