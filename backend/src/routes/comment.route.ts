// routes/comment.route.ts
import { commentController as _ctrl } from "../controllers/comment.controller";
import { Router } from "express";
import { authMW } from "../middlewares/auth.middleware";
import { UserRoleMW } from "../middlewares/role.middleware";
import { UserStatusMW } from "../middlewares/status.middleware";

export const commentRouter = Router();

commentRouter.get("/:id", _ctrl.findById);
commentRouter.post(
  "/",
  authMW,
  UserRoleMW(["admin", "mod", "user"]),
  UserStatusMW(["active"]),
  _ctrl.insert,
);
commentRouter.put(
  "/:id",
  authMW,
  UserRoleMW(["admin", "mod", "user"]),
  UserStatusMW(["active"]),
  _ctrl.modify,
);
