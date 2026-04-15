import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { ApiError } from "../utils/error";

export class JWT_Service {
   create(payload: {
      id: string;
      email: string;
      role: "Admin" | "Customer" | "Analyst";
   }) {
      try {
         return jwt.sign(payload, JWT_SECRET);
      } catch (err) {
         throw new ApiError(401, "Invalid token or expired token");
      }
   }
}
