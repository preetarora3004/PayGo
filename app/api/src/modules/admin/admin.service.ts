import { client } from "@workspace/db/client";
import { CustomerRepository } from "../customer/customer.repository";
import { UserRepository } from "../user/user.repository";
import { ApiError } from "@workspace/api/utils/error";
import { TransactionRepository } from "../transaction/transaction.repository";
import { ApproveCustomerDTO } from "./admin.types";
import { Prisma } from "@prisma/client";
import { AdminRepository } from "./admin.repository";

export class AdminService {
   private repoTransaction = new TransactionRepository();
   private repoUser = new UserRepository();
   private repoCustomer = new CustomerRepository();
   private repoAdmin = new AdminRepository();

   async createAdmin(data: {
      email: string,
      password: string,
      name: string
   }) {
      return await this.repoAdmin.create(data);
   }
   async approveCustomerRequest(data: ApproveCustomerDTO) {
      const isUser = await this.repoUser.getUserById(data.senderId);

      switch (isUser.role) {
         case "Customer":
            return this.handleNewUser(data.senderId, isUser.role);

         case "Analyst":
            return this.handleAnalyst(data.senderId);

         default:
            throw new ApiError(404, "Not a valid ticket");
      }
   }

   async getAllTransaction(customerId: string) {
      const transaction = await this.repoTransaction.getTransaction(customerId);

      if (!transaction.length) {
         throw new ApiError(404, "Transaction not found");
      }
      return transaction;
   }

   async deleteCustomer(userId: string) {
      const deletedData = await this.repoCustomer.deleteCustomer(userId);
      if (!deletedData.id) throw new ApiError(404, "Customer not found");

      return true;
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
      return Date.now() + Math.floor(Math.random() * 10);
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
