import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { CustomerController } from "./customer.controller";
import { Router } from "express";

const router = Router();
const controller = new CustomerController();

router.get(
   "/get-customer/:userId",
   authMiddleware,
   controller.getCustomerByUserId,
);
router.post(
   "/:senderId/:recieverId",
   authMiddleware,
   controller.transaction
);

export default router;
