import { client } from "@workspace/db/client";

export class UserRepository {

   async createUser(data: {
      email: string,
      name: string,
      password: string

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
}
