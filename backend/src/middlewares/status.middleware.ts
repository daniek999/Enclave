// middlewares/status.middleware.ts
import { NextFunction, Response } from "express";
import { UserStatus } from "../../generated/prisma/enums";
import { authRequest } from "./auth.middleware";

export function UserStatusMW(statuses: UserStatus[]) {
  return (req: authRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no Autenticado.",
        data: null,
      });
    }
    if (!statuses.includes(req.user.status as UserStatus)) {
      return res.status(403).json({
        success: false,
        message: "Usuario no autorizado.",
        data: null,
      });
    }
    next();
  };
}
