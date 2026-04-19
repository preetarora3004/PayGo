import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { Utility } from "../../utils/utility";
import { ApiError } from "@workspace/api/utils/error";
import { approveCustomerValidator } from "./admin.validator";
import bcrypt from 'bcrypt';

const service = new AdminService();
const utility = new Utility();

export class AdminController {
   async createAdmin(req: Request, res: Response, next: NextFunction) {
     
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const admin = await service.createAdmin({
         ...req.body,
         password: hashedPassword

      });

      return res.status(201).json({
         success: true,
         data: {
            admin,
         },
      });
   }
   async approveCustomer(req: Request, res: Response, _: NextFunction) {

      const senderId = req.params.senderId as string;
      console.log(req.body)
      const parsed = utility.parse({
         ...req.body,
         senderId
      }, approveCustomerValidator);
      console.log(parsed.data)

      if (!parsed.success) throw new ApiError(409, "Invalid schema");

      const approved = await service.approveCustomerRequest(parsed.data);
      if (!approved) {
         throw new ApiError(500, "Server error");
      }

      return res.status(201).json({
         success: true
      });
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
