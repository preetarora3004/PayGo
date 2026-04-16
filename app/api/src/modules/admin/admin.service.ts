import { client } from "@workspace/db/client";
import { UserRepository } from "../user/user.repository";
import { ApiError } from "@workspace/api/utils/error";
import { Prisma } from "@prisma/client";

export class AdminService {
   private repoUser = new UserRepository();

   async approveCustomerRequest(data: { senderId: string; role: "Customer" }) {
      const isUser = await this.repoUser.getUserById(data.senderId);

      switch (isUser.role) {
         case null:
            return this.handleNewUser(data.senderId, data.role);

         case "Analyst":
            return this.handleAnalyst(data.senderId);

         default:
            throw new ApiError(404, "Not a valid ticket");
      }
   }

   private async handleNewUser(
      userId: string,
      role: "Customer",
   ): Promise<boolean> {
      await this.runTransaction(async (tx) => {
         await tx.user.update({
            where: { id: userId },
            data: { role },
         });
         await this.createBankAccount(userId, tx);
         await tx.ticket.update({
            where: { userId },
            data: { isApproved: "APPROVED" },
         });
      });
      return true;
   }

   private async handleAnalyst(userId: string): Promise<boolean> {
      await this.runTransaction(async (tx) => {
         await tx.analyst.update({
            where: { userId },
            data: { isCustomer: true },
         });
         await this.createBankAccount(userId, tx);
         await tx.ticket.update({
            where: { userId },
            data: { isApproved: "APPROVED" },
         });
      });

      return true;
   }

   private async createBankAccount(
      userId: string,
      tx: Prisma.TransactionClient,
   ) {
      const bankAccountNumber = this.generateBankAccountNumber();
      await tx.customer.create({
         data: {
            userId,
            bankAccount: {
               create: {
                  bankAccountNumber,
               },
            },
         },
      });

      return true;
   }

   private generateBankAccountNumber() {
      return Date.now() + Math.random();
   }

   private async runTransaction(
      fn: (tx: Prisma.TransactionClient) => Promise<void>,
   ) {
      return client.$transaction(fn, {
         maxWait: 5000,
         timeout: 10000,
         isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      });
   }
}
