// types/post.type.ts

// Body Responses
export interface TagItem {
  id: number;
  name: string;
  status: string;
}

// Type Responses
export interface TagListResponse {
  success: boolean;
  message: string;
  data: {
    items: TagItem[];
  };
}
