// apis/post.api.ts
import { api } from "../apis/_axios";
import type {
  PostCreate,
  PostListResponse,
  PostOneResponse,
  PostQuery,
} from "../types/post.type";

export function postApi() {
  const listPosts = async (params: PostQuery) => {
    const response = await api.get<PostListResponse>("/posts", {
      params,
    });
    return response.data;
  };
  const findPostById = async (id: number) => {
    const response = await api.get<PostOneResponse>(`/posts/${id}`);
    return response.data;
  };
  const createPost = async (body: PostCreate) => {
    const response = await api.post("/posts", body);
    return response.data;
  };

  return {
    listPosts,
    findPostById,
    createPost,
  };
}
