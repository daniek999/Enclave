// apis/tag.api.ts
import { api } from "./_axios";
import type { TagListResponse } from "../types/tag.type";

export function tagApi() {
  const listTags = async (
    page: number,
    limit: number,
    status: "active" | "inactive",
  ) => {
    const response = await api.get<TagListResponse>("/tags", {
      params: {
        page,
        limit,
        status,
      },
    });
    return response.data;
  };

  return {
    listTags,
  };
}
