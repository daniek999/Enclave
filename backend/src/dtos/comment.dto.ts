// dtos/comment.dto.ts
import { CommentStatus } from "../../generated/prisma/enums";

export interface CommentReadDTO {
  id: number;
  content: string;
  status: CommentStatus;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDTO {
  content: string;
  userId: number;
  postId: number;
}

export interface CommentUpdateDTO {
  content: string;
  status: CommentStatus;
  userId: number;
  postId: number;
}

export interface CommentSearchDTO {
  page: number;
  limit: number;
  status?: CommentStatus;
}
