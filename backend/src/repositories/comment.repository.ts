// repositories/comment.repository.ts
import { prisma } from "../../prisma/lib/prisma";
import {
  CommentCreateDTO,
  CommentSearchDTO,
  CommentUpdateDTO,
} from "../dtos/comment.dto";

export const commentRepository = {
  readAllByPost: async (postId: number, query: CommentSearchDTO) => {
    const { limit, page, status } = query;
    const skip: number = (page - 1) * limit;
    const where: any = {
      ...(postId && { postId }),
      ...(status && { status }),
    };

    const [data, active, removed, totalItems] = await Promise.all([
      prisma.comment.findMany({
        orderBy: { createdAt: "desc" },
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      prisma.comment.count({ where: { status: "active" } }),
      prisma.comment.count({ where: { status: "removed" } }),
      prisma.comment.count({ where }),
    ]);

    return {
      items: data,
      counts: {
        active,
        removed,
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
    return prisma.comment.findUnique({
      where: { id },
    });
  },
  createOne: async (body: CommentCreateDTO) => {
    return prisma.comment.create({
      data: body,
    });
  },
  updateOne: async (id: number, body: CommentUpdateDTO) => {
    return prisma.comment.update({
      where: { id },
      data: body,
    });
  },
};
