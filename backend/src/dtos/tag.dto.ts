// dtos/post.dto.ts
import { TagStatus } from "../../generated/prisma/enums";
import { Post } from "../../generated/prisma/client";

export interface TagReadDTO {
  id: number;
  name: string;
  status: TagStatus;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
}

export interface TagCreateDTO {
  name: string;
}

export interface TagUpdateDTO {
  name: string;
  status: TagStatus;
}

export interface TagSearchDTO {
  page: number;
  limit: number;
  status?: TagStatus;
}
