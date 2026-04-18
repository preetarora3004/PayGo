import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { AdminUtility } from "./admin.utility";
import { ApiError } from "@workspace/api/utils/error";
import { approveCustomerValidator } from "./admin.validator";

const service = new AdminService();
const utility = new AdminUtility();

export class AdminController {
   async approveCustomer(req: Request, res: Response, _: NextFunction) {
      const parsed = utility.parse(req.body, approveCustomerValidator);
      if (!parsed.success) throw new ApiError(409, "Invalid schema");

      const approved = await service.approveCustomerRequest(parsed.data);
      if (!approved) {
         throw new ApiError(500, "Server error");
      }

      return res.status(201);
   }

   async getAllTransaction(req: Request, res: Response, _: NextFunction) {
      const customerId = req.params.customerId as string;

      if (!customerId) throw new ApiError(409, "Invalid id");

      const transaction = service.getAllTransaction(customerId);

      return res.status(200).json({
         success: true,
         data: {
            transaction,
         },
      });
   }
}
