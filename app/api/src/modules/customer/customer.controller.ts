import { Request, Response } from "express";
import { customerCreationValidator } from "@workspace/api/modules/customer/customer.validator";
import { CustomerService } from "@workspace/api/modules/customer/customer.service";
import { ApiError } from "@workspace/api/utils/error";

const service = new CustomerService();

export class CustomerController {
   async createCustomer(req: Request, res: Response) {
      const userId = req.user?.id;
      const parsed = customerCreationValidator.safeParse({
         ...req.body,
         userId,
      });

      if (!parsed.success) throw new ApiError(409, "Invalid schema");

      const customer = await service.createCustomer(parsed.data);

      return res.status(201).json({
         success: true,
         data: {
            customer,
         },
      });
   }

   async getCustomer(_: Request, res: Response) {
      const customer = await service.getCustomer();

      if (customer.length === 0) {
         throw new ApiError(404, "Customer's not found");
      }

      return res.status(200).json({
         success: true,
         data: {
            customer,
         },
      });
   }

   async getCustomerByUserId(req: Request, res: Response) {
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
}
