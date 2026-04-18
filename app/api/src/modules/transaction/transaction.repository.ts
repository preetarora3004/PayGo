import { client } from "@workspace/db/client";

export class TransactionRepository {
   async getTransaction(customerId: string) {
      return await client.transaction.findMany({
         where: {
            senderId: customerId,
         },
      });
   }

   async editTransaction(data: { id: string; activity: "FAILED" | "APPROVED" }) {
      return await client.transaction.update({
         where: {
            id: data.id,
         },

         data: {
            status: data.activity,
         },
      });
   }
}
