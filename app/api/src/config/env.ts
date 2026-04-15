import { ApiError } from "../utils/error";

if(!process.env.JWT_SECRET) {
    throw new ApiError(400, "JWT_SECRET is not defined")
}

export const JWT_SECRET = process.env.JWT_SECRET;