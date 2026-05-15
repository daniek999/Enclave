// middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
    status: UserStatus;
  };
}

export function authMW(req: authRequest, res: Response, next: NextFunction) {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    return res.status(500).json({
      data: null,
      message: "Token no proporcionado.",
      success: true,
    });
  }

  const parts = authorization.split(" ");
  if (parts.length > 2) {
    return res.status(500).json({
      data: null,
      message: "Formato de token inválido.",
      success: true,
    });
  }

  const [type, token] = parts;
  if (type !== "Bearer") {
    return res.status(500).json({
      success: false,
      message: "Formato de autorización inválido.",
      data: null,
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: UserRole;
      status: UserStatus;
    };
    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Token inválido o expirado",
      data: null,
    });
  }
}
