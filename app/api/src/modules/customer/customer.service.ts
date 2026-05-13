import { CustomerRepository } from "@workspace/api/modules/customer/customer.repository";
import { ApiError } from "@workspace/api/utils/error";
import { Prisma } from "@prisma/client";
import { client } from "@workspace/db/client";

export class CustomerService {
   private repo = new CustomerRepository();

   async transaction(data: {
      bankAccountNumber: number;
      description: string;
      recieverId: string;
      senderId: string;
      recieverName: string;
      senderName: string;
      funds: number;
   }) {
      return await this.transactionByCustomerId(
         data.senderId,
         data.recieverId,
         data.recieverName,
         data.senderName,
         data.funds,
         data.bankAccountNumber,
      );
   }

   private async transactionByCustomerId(
      senderId: string,
      recieverId: string,
      recieverName: string,
      senderName: string,
      funds: number,
      bankAccountNumber: number,
   ) {
      const ticket = await this.ticketCreation({
         amount: funds,
         receiverId: recieverId,
         senderId,
         bankAccountNumber,
         receiverName: recieverName,
      });

      if (!ticket.id) throw new ApiError(500, "Server Error");

      try {
         await this.runTransaction(async (tx) => {
            const sender = await tx.bankAccount.updateMany({
               where: { customerId: senderId, funds: { gte: funds } },
               data: { funds: { decrement: funds } },
            });

            if (sender.count === 0) throw new ApiError(403, "Insufficient balance");

            const reciever = await tx.bankAccount.updateMany({
               where: { customerId: recieverId },
               data: { funds: { increment: funds } },
            });

            if (reciever.count === 0) throw new ApiError(404, "User not exists");

            const receiverTicket = await this.ticketCreation({
               amount: funds,
               receiverId: recieverId,
               senderId,
               bankAccountNumber,
               senderName,
               tx,
            });

            await Promise.all([
               this.transactionUpdate(ticket.id, "DEBIT", tx),
               this.transactionUpdate(receiverTicket.id, "CREDIT", tx),
            ]);
         });
      } catch (error) {
         await this.transactionUpdate(ticket.id);
         throw new ApiError(500, "Failed");
      }
   }

   private async ticketCreation({
      amount,
      receiverId,
      senderId,
      bankAccountNumber,
      senderName,
      receiverName,
      tx,
   }: {
      amount: number;
      receiverId: string;
      senderId: string;
      bankAccountNumber: number;
      senderName?: string;
      receiverName?: string;
      tx?: Prisma.TransactionClient;
   }) {
      const db = tx ?? client;
      if (senderName) {
         const ticket = await db.transaction.create({
            data: {
               senderName,
               recieverName: receiverName,
               receiverId: receiverId,
               senderId,
               funds: amount,
               bankAccountNumber: bankAccountNumber,
            },
         });

         return ticket;
      } else {
         const ticket = await db.transaction.create({
            data: {
               recieverName: receiverName,
               senderName,
               receiverId: receiverId,
               senderId,
               funds: amount,
               bankAccountNumber: bankAccountNumber,
            },
         });

         return ticket;
      }
   }

   private async transactionUpdate(
      ticketId: string,
      update?: "DEBIT" | "CREDIT" | "PENDING",
      tx?: Prisma.TransactionClient,
   ) {
      const db = tx ?? client;
      switch (update) {
         case "DEBIT":
            return await db.transaction.update({
               where: { id: ticketId },
               data: { status: "DEBIT" },
            });

         case "CREDIT":
            return await db.transaction.update({
               where: { id: ticketId },
               data: { status: "CREDIT" },
            });

         default:
            return await db.transaction.update({
               where: { id: ticketId },
               data: { status: "FAILED" },
            });
      }
   }

   private async runTransaction<T>(
      fn: (tx: Prisma.TransactionClient) => Promise<T>,
   ): Promise<T> {
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
