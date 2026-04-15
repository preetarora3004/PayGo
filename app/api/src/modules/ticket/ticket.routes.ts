import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { asyncHander } from "@workspace/api/utils/asyncWrapper";
import { authMiddleware } from "@workspace/api/middlewares/auth.middleware";
import { roleMiddleware } from "@workspace/api/middlewares/role.middleware";

const router = Router();
const controller = new TicketController();

router.post("/create", authMiddleware, asyncHander(controller.createTicket));
router.get("/get-users", authMiddleware, roleMiddleware, asyncHander(controller.getUsersTicket));
router.get("/get-staffs", authMiddleware, roleMiddleware, asyncHander(controller.getStaffsTicket));
router.patch("/approve/:id", authMiddleware, roleMiddleware, asyncHander(controller.approveTicket));
router.patch("/reject/:id", authMiddleware, roleMiddleware, asyncHander(controller.rejectTicket));

export default router;
