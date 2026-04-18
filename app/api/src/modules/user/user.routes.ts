import { Router } from "express";
import { UserController } from "./user.controller";
import { asyncHandler } from "@workspace/api/utils/asyncWrapper";

const router = Router();
const controller = new UserController();

router.post("/signup", asyncHandler(controller.createUser));
router.post("/signin", asyncHandler(controller.getUser));

export default router;
