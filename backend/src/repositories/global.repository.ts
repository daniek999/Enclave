// repositories/global.repository.ts
import { prisma } from "../../prisma/lib/prisma";

export function globalRepository() {
  const readActiveStatistics = async () => {
    const [activeUsers, activePosts, activeComments, activeTags] =
      await Promise.all([
        prisma.user.count({
          where: { status: "active" },
        }),
        prisma.post.count({
          where: { status: "active" },
        }),
        prisma.comment.count({
          where: { status: "active" },
        }),
        prisma.tag.count({
          where: { status: "active" },
        }),
      ]);

    return {
      counts: {
        activeUsers,
        activePosts,
        activeComments,
        activeTags,
      },
    };
  };

  return {
    readActiveStatistics,
  };
}
