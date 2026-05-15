// types/post.type.ts
import type { Count, ApiResponse, Pagination, Query } from "./common.type";

// Data
export interface PostItem {
  id: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
  tag: {
    id: number;
    name: string;
  };
}
export interface PostCreate {
  title: string;
  content: string;
  tagId: number;
}

// Meta
export interface PostCount extends Count {
  active: number;
  archived: number;
  removed: number;
}
export interface PostQuery extends Query {
  status?: "active" | "archived" | "removed";
  title?: string;
  tagId?: number;
}
export type PostPagination = Pagination;

// Response
export interface PostListResponse extends ApiResponse {
  data: {
    items: PostItem[];
    counts: PostCount;
    pagination: PostPagination;
  };
}
export interface PostOneResponse extends ApiResponse {
  data: {
    item: PostItem;
  };
}
