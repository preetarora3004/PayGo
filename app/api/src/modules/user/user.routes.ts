import { Router } from "express";
import { UserController } from "./user.controller";
import { asyncHander } from "@workspace/api/utils/asyncWrapper";

const router = Router();
const controller = new UserController();

router.post("/signup", asyncHander(controller.createUser));
router.post("/signin", asyncHander(controller.getUser));

export default router;
