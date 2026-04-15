import { CustomerController } from "./customer.controller";
import { Router } from "express";

const router = Router();
const controller = new CustomerController();

router.post("/customer-create/:userId", controller.createCustomer);
router.get("/get-customer/:userId", controller.getCustomerByUserId);
router.get("/get-customer", controller.getCustomer);

export default router;
