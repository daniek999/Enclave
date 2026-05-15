// types/auth.type.ts

// Body Responses
export interface AuthUser {
  id: number;
  username: string;
  role: "user" | "mod" | "admin";
  status: "active" | "suspended" | "banned";
}

export interface LoginBody {
  username: string;
  password: string;
  role: "user" | "mod" | "admin";
  status: "active" | "suspended" | "banned";
}

export interface RegisterBody {
  username: string;
  password: string;
}

// Type Responses
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    item: AuthUser;
    token: string;
  };
}
