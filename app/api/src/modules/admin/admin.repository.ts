import { client } from "@workspace/db/client";

export class AdminRepository {
   async create(userId: string) {
      return await client.admin.create({
         data: {
            userId,
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
