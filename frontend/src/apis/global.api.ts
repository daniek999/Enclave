// apis/global.api.ts
import { api } from "./_axios";
import type { GlobalOneResponse } from "../types/global.type";

export function globalAPI() {
  const listActiveStatistics = async () => {
    const res = await api.get<GlobalOneResponse>(`/globals`);
    return res.data;
  };

  return {
    listActiveStatistics,
  };
}
