import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { UserUtils } from './user.utils';
import { userDTOValidator, userSignInValidator } from './user.validator';

const service = new UserService();
const utility = new UserUtils();

export class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = userDTOValidator.safeParse(req.body);

            if (!parsed.success) {
                throw new Error("Invalid schema")
            }

            const isUser = await service.getUser(parsed.data.email);

            if (isUser) {
                throw new Error("User exists")
            }

            const hashedPassword = await utility.cryptPassword(parsed.data.password);
            const user = await service.createUser({
                ...parsed.data,
                password: hashedPassword
            });
            const token = utility.createToken({
                id: user.id,
                email: user.email
            })

            return res.status(201).json({
                success: true,
                data: {
                    token
                }
            })
        }
        catch (err) {
            next(err);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = userSignInValidator.safeParse(req.body);

            if (!parsed.success) throw new Error("Invalid schema");

            const user = await service.getUser(parsed.data.email);

            if (!user) throw new Error("User not exists")

            const isValid = await utility.comparePassword(parsed.data.password, user.password);
            const token = utility.createToken({
                id: user.id,
                email: user.email
            })

            return res.status(200).json({
                success: true,
                data: {
                    token
                }
            })
        }
        catch (err) {
            next(err);
        }
    }
}
