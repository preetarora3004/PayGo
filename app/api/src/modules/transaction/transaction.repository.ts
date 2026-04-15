import { client } from "@workspace/db/client";

export class TransactionRepository {
   async getTransaction(data: { senderId: string }) {
      return await client.transaction.findMany({
         where: {
            senderId: data.senderId,
         },
      });
   }

   async editTransaction(data: { id: string; activity: "FAILED" | "APPROVED" }) {
      return await client.transaction.update({
         where: {
            id: data.id,
         },

         data: {
            activity: data.activity,
         },
      });
   }
}
