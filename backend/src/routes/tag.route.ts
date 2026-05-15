// routes/tag.route.ts
import { tagController as _ctrl } from "../controllers/tag.controller";
import { Router } from "express";
import { authMW } from "../middlewares/auth.middleware";
import { UserRoleMW } from "../middlewares/role.middleware";
import { UserStatusMW } from "../middlewares/status.middleware";

export const tagRouter = Router();

tagRouter.get("/", _ctrl.list);
tagRouter.get("/:id", _ctrl.findById);
tagRouter.post(
  "/",
  authMW,
  UserRoleMW(["admin"]),
  UserStatusMW(["active"]),
  _ctrl.insert,
);
tagRouter.put(
  "/:id",
  authMW,
  UserRoleMW(["admin"]),
  UserStatusMW(["active"]),
  _ctrl.modify,
);
