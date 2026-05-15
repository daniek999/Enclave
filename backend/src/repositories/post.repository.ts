// repositories/post.repository.ts
import { prisma } from "../../prisma/lib/prisma";
import { PostCreateDTO, PostSearchDTO, PostUpdateDTO } from "../dtos/post.dto";

export const postRepository = {
  readAll: async (query: PostSearchDTO) => {
    const { limit, page, status, title, tagId } = query;
    const skip: number = (page - 1) * limit;
    const where: any = {
      ...(status && { status }),
      ...(title && {
        title: {
          contains: title,
        },
      }),
      ...(tagId && { tagId }),
    };

    const [items, counts, totalItems] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, username: true } },
          tag: true,
          _count: { select: { comments: true } },
        },
      }),
      prisma.post.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.post.count({ where }),
    ]);

    const countsFormatted = {
      active: counts.find((c) => c.status === "active")?._count || 0,
      archived: counts.find((c) => c.status === "archived")?._count || 0,
      removed: counts.find((c) => c.status === "removed")?._count || 0,
    };

    return {
      items,
      counts: countsFormatted,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  },
  readOneById: async (id: number) => {
    return prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
  createOne: async (body: PostCreateDTO) => {
    return prisma.post.create({
      data: body,
    });
  },
  updateOne: async (id: number, body: PostUpdateDTO) => {
    return prisma.post.update({
      where: { id },
      data: body,
    });
  },
};
