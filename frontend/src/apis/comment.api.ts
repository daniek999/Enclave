// apis/comment.api.ts
import { api } from "./_axios";
import type {
  CommentListResponse,
  CreateCommentBody,
} from "../types/comment.type";

export function commentApi() {
  const listComments = async (postId: number) => {
    const response = await api.get<CommentListResponse>(
      `/posts/${postId}/comments`,
    );
    return response.data;
  };
  const createComment = async (body: CreateCommentBody) => {
    const response = await api.post("/comments", body);
    return response.data;
  };

  return {
    listComments,
    createComment,
  };
}
