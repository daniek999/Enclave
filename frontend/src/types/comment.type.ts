// types/comment.type.ts

// Body Responses
export interface CommentItem {
  id: number;
  content: string;
  status: string;

  createdAt: string;

  user: {
    id: number;
    username: string;
  };
}

// Type Responses
export interface CommentListResponse {
  success: boolean;
  message: string;
  data: {
    items: CommentItem[];
  };
}
export interface CreateCommentBody {
  content: string;
  postId: number;
}
