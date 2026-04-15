import jwt from 'jsonwebtoken';
import { userTokenValidator } from './user.validator';
import bcrypt from 'bcrypt';
import { ApiError } from '@workspace/api/utils/error';

export class UserUtils {

    createToken(data: {
        id: string,
        email: string
    }) {
        const parsed = userTokenValidator.safeParse(data);

        if (!process.env.JWT_SECRET || !parsed.success) {
            throw new ApiError(409,"Invalid schema")
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);

        if (!token) throw new ApiError(500, "Server Error")

        return token;
    }

    async cryptPassword(password: string) {

        if(!password) throw new ApiError(403, "Invalid password");

        const SALT_ROUND = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        return hashedPassword;
    }

    async comparePassword(userPassword: string, cryptPassword: string) {
        const isValid = await bcrypt.compare(userPassword, cryptPassword);

        if(!isValid) throw new ApiError(403, "Invalid password");
        return;
    }

}
