// controller/global.controller.ts
import { globalService } from "../services/global.service";
import { Request, Response } from "express";

export function globalController() {
  const { getGlobalActives } = globalService();

  const list = async (req: Request, res: Response) => {
    try {
      const { data, message, success } = await getGlobalActives();
      return res.status(200).json({
        success,
        message,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message ?? "Error del servidor",
        data: null,
      });
    }
  };

  return {
    list,
  };
}
