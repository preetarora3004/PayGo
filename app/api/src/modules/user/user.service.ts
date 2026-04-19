import { UserRepository } from "@workspace/api/modules/user/user.repository";
import { UserCreationDTO } from "@workspace/api/modules/user/user.types";
import { ApiError } from "@workspace/api/utils/error";
import { client } from "@workspace/db/client";

export class UserService {
   private repo = new UserRepository();

   async createUser(data: UserCreationDTO) {
      return await this.repo.createUser(data);
   }

   async getUser(email: string) {
      return await this.repo.getUserByCredentials(email);
   }

   async applyForAccount(data: UserCreationDTO) {
      const customer = await client.user.create({
         data: {
            email: data.email,
            name: data.name,
            password: data.password,
            role: data.role,
            ticket: {
               create: {
                  status: "PENDING",
               },
            },
         },
      });

      if(!customer.id) throw new ApiError(500, "Unexpected error")
      
      return customer;
   }
}
