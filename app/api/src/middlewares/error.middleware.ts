import { Request, Response, NextFunction } from "express";

export async function errorMiddleware(
   err: any,
   req: Request,
   res: Response,
   next: NextFunction,
) {
   return res.status(err.status).json({
      error: err.message,
   });
}
