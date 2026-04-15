import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/error";

export async function authMiddleware(
   req: Request,
   _: Response,
   next: NextFunction,
) {
   try {
      if (
         !req.headers.authorization ||
         !req.headers.authorization.startsWith("Bearer") ||
         !process.env.JWT_SECRET
      ) {
         throw new ApiError(400, "Invalid request");
      }

      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new ApiError(403, "Unauthorized access");

      const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      if (!payload) throw new ApiError(403, "Unauthorized access");

      req.user = payload;
      next();
   } catch (err) {
      next(err);
   }
}
