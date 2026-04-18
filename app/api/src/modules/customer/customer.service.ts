import { CustomerRepository } from "@workspace/api/modules/customer/customer.repository";
import { ApiError } from "@workspace/api/utils/error";
import { Prisma } from "@prisma/client";
import { client } from "@workspace/db/client";

export class CustomerService {
   private repo = new CustomerRepository();

   async transaction(data: {
      bankAccountNumber: number;
      recieverId: string;
      senderId: string;
      funds: number;
   }) {
      return await this.transactionByCustomerId(
         data.senderId,
         data.recieverId,
         data.funds,
         data.bankAccountNumber,
      );
   }

   /*private async transactionByEmail(
        userId: string,
        email: string,
        funds: number,
     ) { } */

   private async transactionByCustomerId(
      senderId: string,
      recieverId: string,
      funds: number,
      bankAccountNumber: number,
   ): Promise<boolean | Error> {
      const ticket = await client.transaction.create({
         data: {
            receiverId: recieverId,
            senderId,
            funds,
            bankAccountNumber: bankAccountNumber,
         },
      });

      await this.runTransaction(async (tx) => {
         const sender = await tx.bankAccount.updateMany({
            where: { customerId: senderId, funds: { gte: funds } },
            data: { funds: { decrement: funds } },
         });

         if (!sender) throw new ApiError(403, "Insufficient balance");

         const reciever = await tx.bankAccount.update({
            where: { customerId: recieverId },
            data: { funds: { increment: funds } },
         });

         if (!reciever) throw new ApiError(404, "User not exists");

         await this.transactionUpdate(ticket.id, "APPROVED");
      });

      return true;
   }

   private async transactionUpdate(
      ticketId: string,
      update?: "APPROVED" | "FAILED" | "PENDING",
   ) {
      switch (update) {
         case "APPROVED":
            return await client.transaction.update({
               where: { id: ticketId },
               data: { status: "APPROVED" },
            });

         case "FAILED":
            return await client.transaction.update({
               where: { id: ticketId },
               data: { status: "FAILED" },
            });

         default:
            return await client.transaction.update({
               where: { id: ticketId },
               data: { status: "PENDING" },
            });
      }
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

   async getCustomerByUserId(userId: string) {
      return await this.repo.getCustomerByUserId(userId);
   }
}
