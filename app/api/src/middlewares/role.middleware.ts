import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/error";

export async function roleMiddleware(
   req: Request,
   _: Response,
   next: NextFunction,
) {
   const payload = req.user;
   if (payload!.role !== "Admin") throw new ApiError(401, "Not authorized");

   next();
}
