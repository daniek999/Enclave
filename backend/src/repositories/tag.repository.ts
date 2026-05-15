// repositories/tag.repository.ts
import { prisma } from "../../prisma/lib/prisma";
import { TagCreateDTO, TagSearchDTO, TagUpdateDTO } from "../dtos/tag.dto";

export const tagRepository = {
  readAll: async (query: TagSearchDTO) => {
    const { limit, page, status } = query;
    const where: any = {};
    const skip: number = (page - 1) * limit;

    if (status) where.status = status;

    const [items, active, inactive, totalItems] = await Promise.all([
      prisma.tag.findMany({
        orderBy: { createdAt: "asc" },
        where,
        skip,
        take: limit,
      }),
      prisma.tag.count({ where: { status: "active" } }),
      prisma.tag.count({ where: { status: "inactive" } }),
      prisma.tag.count({ where }),
    ]);

    return {
      items,
      counts: {
        active,
        inactive,
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
    return await prisma.tag.findUnique({
      where: { id },
    });
  },
  createOne: async (body: TagCreateDTO) => {
    return await prisma.tag.create({
      data: body,
    });
  },
  updateOne: async (id: number, body: TagUpdateDTO) => {
    return await prisma.tag.update({
      where: { id },
      data: body,
    });
  },
};
