// dtos/user.dto.ts
import { UserRole, UserStatus } from "../../generated/prisma/enums";

export interface UserRegisterDTO {
  username: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface UserUpdateDTO {
  username?: string;
  password?: string;
  status?: UserStatus;
  role?: UserRole;
}

export interface UserSearchDTO {
  page: number;
  limit: number;
  status?: UserStatus;
  role?: UserRole;
}
