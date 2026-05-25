// routes/global.route.ts
import { globalController } from "../controllers/global.controller";
import { Router } from "express";

const globalRouter = Router();
const { list } = globalController();

globalRouter.get("/", list);

export default globalRouter;
