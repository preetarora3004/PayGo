import { NextFunction, Request, Response } from "express";
import { UserService } from "@workspace/api/modules/user/user.service";
import { UserUtils } from "@workspace/api/modules/user/user.utils";
import {
   userDTOValidator,
   userSignInValidator,
} from "@workspace/api/modules/user/user.validator";
import { ApiError } from "@workspace/api/utils/error";

const service = new UserService();
const utility = new UserUtils();

export class UserController {
   async createUser(req: Request, res: Response) {
      const parsed = userDTOValidator.safeParse(req.body);
      
      if (!parsed.success) {
         throw new ApiError(409, "Invalid schema");
      }

      const isUser = await service.getUser(parsed.data.email);

      if (isUser) {
         throw new ApiError(403, "User exists");
      }

      const hashedPassword = await utility.cryptPassword(parsed.data.password);
      const user = await service.applyForAccount({
         ...parsed.data,
         password: hashedPassword,
      });
      const token = utility.createToken({
         id: user.id,
         email: user.email,
         role: user.role,
      });

      return res.status(201).json({
         success: true,
         data: {
            token: token,
         },
      });
   }

   async getUser(req: Request, res: Response) {
      const parsed = userSignInValidator.safeParse(req.body);

      if (!parsed.success) throw new ApiError(409, "Invalid schema");

      const user = await service.getUser(parsed.data.email);

      if (!user) throw new ApiError(401, "User not exists");

      const isValid = await utility.comparePassword(
         parsed.data.password,
         user.password,
      );
      const token = utility.createToken({
         id: user.id,
         email: user.email,
         role: user.role,
      });

      return res.status(200).json({
         success: true,
         data: {
            token,
         },
      });
   }
}
