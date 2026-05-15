// routes/user.route.ts
import { userController as _ctrl } from "../controllers/user.controller";
import { Router } from "express";
import { authMW } from "../middlewares/auth.middleware";
import { UserRoleMW } from "../middlewares/role.middleware";
import { UserStatusMW } from "../middlewares/status.middleware";

export const userRouter = Router();

userRouter.get(
  "/",
  authMW,
  UserRoleMW(["admin"]),
  UserStatusMW(["active"]),
  _ctrl.list,
);
userRouter.get(
  "/me",
  authMW,
  UserRoleMW(["user", "admin", "mod"]),
  UserStatusMW(["active"]),
  _ctrl.findSelf,
);
userRouter.get(
  "/:id",
  authMW,
  UserRoleMW(["user", "admin"]),
  UserStatusMW(["active"]),
  _ctrl.findById,
);
userRouter.post("/register", _ctrl.register);
userRouter.post("/login", _ctrl.login);
userRouter.put(
  "/:id",
  authMW,
  UserRoleMW(["admin"]),
  UserStatusMW(["active"]),
  _ctrl.modify,
);
