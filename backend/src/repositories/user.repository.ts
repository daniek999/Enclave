// repositories/user.repository.ts
import { prisma } from "../../prisma/lib/prisma";
import {
  UserRegisterDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../dtos/user.dto";

export const userRepository = {
  readAll: async (query: UserSearchDTO) => {
    const { limit, page, role, status } = query;
    const where: any = {};
    const skip = (page - 1) * limit;

    if (role) where.role = role;
    if (status) where.status = status;

    const [items, active, suspended, banned, user, mod, admin, totalItems] =
      await Promise.all([
        prisma.user.findMany({
          orderBy: { createdAt: "asc" },
          where,
          skip,
          take: limit,
          //omit: { password: true },
        }),
        prisma.user.count({ where: { status: "active" } }),
        prisma.user.count({ where: { status: "suspended" } }),
        prisma.user.count({ where: { status: "banned" } }),
        prisma.user.count({ where: { role: "user" } }),
        prisma.user.count({ where: { role: "mod" } }),
        prisma.user.count({ where: { role: "admin" } }),
        prisma.user.count({ where }),
      ]);

    return {
      items,
      counts: {
        active,
        suspended,
        banned,
        user,
        mod,
        admin,
      },
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  },
  readOneById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  },
  createOne: async (body: UserRegisterDTO) => {
    return prisma.user.create({
      data: body,
    });
  },
  updateOne: async (id: number, body: UserUpdateDTO) => {
    return prisma.user.update({
      where: { id },
      data: body,
    });
  },
  readOneByUsername: async (username: string) => {
    return prisma.user.findUnique({
      where: { username },
    });
  },
};
