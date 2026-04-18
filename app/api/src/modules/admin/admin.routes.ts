import { AdminController } from "./admin.controller";
import { roleMiddleware } from "@workspace/api/middlewares/role.middleware";
import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();
const controller = new AdminController();

router.post(
   "/approve-customer/:senderId",
   authMiddleware,
   roleMiddleware,
   controller.approveCustomer,
);

export default router;
