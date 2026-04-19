import { client } from "@workspace/db/client";

export class AdminRepository {
   async create(data: { email: string; name: string; password: string }) {
      return await client.user.create({
         data: {
            email: data.email,
            name: data.name,
            password: data.password,
            role: "Admin",
            admin: {
               create: {},
            },
         },
      });
   }

   async getAdminByCredentials(data: { email: string }) {
      return await client.user.findUnique({
         where: {
            email: data.email,
         },
         include: {
            admin: true,
         },
      });
   }

   async createBankAccount(data: {
      customerId: string;
      bankAccountNumber: number;
   }) {
      return await client.bankAccount.create({ data });
   }

   async deleteAdmin(data: { userId: string }) {
      return await client.user.delete({
         where: {
            id: data.userId,
         },
      });
   }
}
