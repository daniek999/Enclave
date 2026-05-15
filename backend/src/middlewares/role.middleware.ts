// middlewares/role.middleware.ts
import { NextFunction, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { authRequest } from "./auth.middleware";

export function UserRoleMW(roles: UserRole[]) {
  return (req: authRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no Autenticado.",
        data: null,
      });
    }
    if (!roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        success: false,
        message: "Usuario no autorizado.",
        data: null,
      });
    }
    next();
  };
}
