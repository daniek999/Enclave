// apis/user.api.ts
import { api } from "../apis/_axios";
import type {
  UserListResponse,
  UserOneResponse,
  UserSearch,
  UserUpdate,
} from "../types/user.type";

export function userApi() {
  const listUsers = async (params: UserSearch) => {
    const res = await api.get<UserListResponse>(`/users`, { params });
    return res.data;
  };
  const findUserById = async (id: number) => {
    const res = await api.get<UserOneResponse>(`/users${id}`);
    return res.data;
  };
  const findSelfById = async () => {
    const res = await api.get<UserOneResponse>(`/users/me`);
    return res.data;
  };
  const updateUser = async (id: number, body: UserUpdate) => {
    const res = await api.put<UserOneResponse>(`/users/${id}`, body);
    return res.data;
  };

  return {
    listUsers,
    findUserById,
    findSelfById,
    updateUser,
  };
}
