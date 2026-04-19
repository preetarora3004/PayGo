import { ApiError } from "@workspace/api/utils/error";
import { client } from "@workspace/db/client";

export class UserRepository {

   async createUser(data: {
      email: string,
      name: string,
      password: string,
      role: "Customer" | "Analyst"

   }) {
      return await client.user.create({ data });
   }

   async getUserByCredentials(email: string) {
      return await client.user.findUnique({
         where: {
            email
         }
      })
   }

   async getUserById(userId: string) {
      const user = await client.user.findUnique({
         where: {id: userId}
      })

      if(!user || !user.id) throw new ApiError(404, "No user exists");

      return user;
   }
}
