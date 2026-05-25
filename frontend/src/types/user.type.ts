// types/user.type.ts

// Body Responses
export interface UserItem {
  id: number;
  username: string;
  role: "user" | "mod" | "admin"; // Tipado más estricto si manejas roles fijos
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
export interface UserCount {
  active: number;
  suspended: number;
  banned: number;
  user: number;
  mod: number;
  admin: number;
}
export interface UserPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
export interface UserSearch {
  limit: number;
  page: number;
  role?: "user" | "mod" | "admin";
  status?: "active" | "suspended" | "banned";
}

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
