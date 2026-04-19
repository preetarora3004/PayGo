import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { asyncHandler } from "@workspace/api/utils/asyncWrapper";
import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { roleMiddleware } from "@workspace/api/middlewares/role.middleware";

const router = Router();
const controller = new TicketController();

router.post("/create", authMiddleware, asyncHandler(controller.createTicket));
router.get("/get-users", authMiddleware, roleMiddleware, asyncHandler(controller.getUsersTicket));
router.get("/get-staffs", authMiddleware, roleMiddleware, asyncHandler(controller.getStaffsTicket));
router.patch("/approve/:id", authMiddleware, roleMiddleware, asyncHandler(controller.approveTicket));
router.patch("/reject/:id", authMiddleware, roleMiddleware, asyncHandler(controller.rejectTicket));

export default router;
