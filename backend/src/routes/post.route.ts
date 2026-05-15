// routes/post.route.ts
import { postController as _ctrl } from "../controllers/post.controller";
import { commentController as _ctrlComment } from "../controllers/comment.controller";
import { Router } from "express";
import { authMW } from "../middlewares/auth.middleware";
import { UserRoleMW } from "../middlewares/role.middleware";
import { UserStatusMW } from "../middlewares/status.middleware";

export const postRouter = Router();

postRouter.get("/", _ctrl.list);
postRouter.get("/:id", _ctrl.findById);
postRouter.get("/:id/comments", _ctrlComment.list);
postRouter.post(
  "/",
  authMW,
  UserRoleMW(["admin", "mod", "user"]),
  UserStatusMW(["active"]),
  _ctrl.insert,
);
postRouter.put(
  "/:id",
  authMW,
  UserRoleMW(["admin", "mod", "user"]),
  UserStatusMW(["active"]),
  _ctrl.modify,
);
