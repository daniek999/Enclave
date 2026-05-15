// dtos/post.dto.ts
import { PostStatus } from "../../generated/prisma/enums";
import { Comment } from "../../generated/prisma/client";

export interface PostReadDTO {
  title: string;
  content: string;
  status: PostStatus;
  userId: number;
  tagId: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostCreateDTO {
  title: string;
  content: string;
  userId: number;
  tagId: number;
}

export interface PostUpdateDTO {
  title?: string;
  content?: string;
  status?: PostStatus;
  userId?: number;
  tagId?: number;
}

export interface PostSearchDTO {
  page: number;
  limit: number;
  status?: PostStatus;
  title?: string;
  tagId?: number;
}
