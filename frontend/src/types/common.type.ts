// types/post.type.ts

// Responses
export interface ApiResponse {
  success: boolean;
  message: string;
}

// Data
export interface Count {
  total: number;
}
export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
export interface Query {
  limit: number;
  page: number;
}
