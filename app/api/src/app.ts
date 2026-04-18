import cors from "cors";
import express from "express";
import userRoutes from "./modules/user/user.routes";
import customerRoutes from "./modules/customer/customer.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import ticketRoutes from "./modules/ticket/ticket.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/customer", customerRoutes);
app.use("/ticket", ticketRoutes);
app.use("/admin", adminRoutes);
app.use(errorMiddleware);

export default app;
