import { AdminController } from "./admin.controller";
import { roleMiddleware } from "@workspace/api/middlewares/role.middleware";
import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { Router } from "express";
import { asyncHandler } from "@workspace/api/utils/asyncWrapper";

const router = Router();
const controller = new AdminController();

router.post(
   "/approve-customer/:senderId",
   authMiddleware,
   roleMiddleware,
   asyncHandler(controller.approveCustomer),
);

router.post(
   "/create-admin",
//   authMiddleware,
   asyncHandler(controller.createAdmin),
);

export default router;
