import { UserRepository } from "./user.repository";
import { UserCreationDTO } from "./user.types";

export class UserService {
    private repo = new UserRepository();

    async createUser(data: UserCreationDTO) {
        return await this.repo.createUser(data);
    }

    async getUser(email: string) {
        return await this.repo.getUserByCredentials(email);
    }
}