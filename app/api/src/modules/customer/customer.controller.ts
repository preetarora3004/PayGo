import { Request, NextFunction, Response } from "express";
import { Utility } from "@workspace/api/utils/utility";
import { transactionCreationValidator } from "./customer.validator";
import { CustomerService } from "@workspace/api/modules/customer/customer.service";
import { ApiError } from "@workspace/api/utils/error";

const service = new CustomerService();
const utility = new Utility();

export class CustomerController {
   async getCustomerByUserId(req: Request, res: Response, next: NextFunction) {
      const userId = req.user?.id;

      if (!userId) {
         throw new ApiError(400, "Invalid schema");
      }

      const customer = await service.getCustomerByUserId(userId);
      if (!customer) throw new ApiError(400, "Customer not exists");

      return res.status(200).json({
         success: true,
         data: {
            customer,
         },
      });
   }

   async transaction(req: Request, res: Response, next: NextFunction) {
      const senderId = req.params.senderId as string;
      const recieverId = req.params.recieverId as string;
      console.log({...req.body, senderId, recieverId})
      const parsed = utility.parse(
         {
            ...req.body,
            senderId,
            recieverId,
         },
         transactionCreationValidator,
      );

      if (!parsed.success) throw new ApiError(409, "Invalid details");

      const approved = service.transaction(parsed.data);

      return res.status(201).json({
         success: approved,
      });
   }
}
