import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { CustomerController } from "./customer.controller";
import { Router } from "express";
import { asyncHandler } from "@workspace/api/utils/asyncWrapper";

const router = Router();
const controller = new CustomerController();

router.get(
   "/get-customer/:userId",
   // authMiddleware,
   asyncHandler(controller.getCustomerByUserId),
);
router.post(
   "/transaction/:senderId/:recieverId",
   authMiddleware,
   asyncHandler(controller.transaction),
);

export default router;
