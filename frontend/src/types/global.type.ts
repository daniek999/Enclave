// types/global.type.ts
import type { Count } from "./common.type";

// Body Responses
export interface GlobalCount extends Count {
  activeUsers: number;
  activePosts: number;
  activeComments: number;
  activeTags: number;
}

// Type Responses
export interface GlobalOneResponse {
  success: boolean;
  message: string;
  data: { counts: GlobalCount };
}
