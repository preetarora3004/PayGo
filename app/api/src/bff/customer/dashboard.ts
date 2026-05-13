import { ApiError } from "@workspace/api/utils/error";
import { client } from "@workspace/db/client";

export class CustomerUIService {
   async getCustomerDTO(userId: string) {
      const user = await client.user.findUnique({
         where: { id: userId },
         select: {
            name: true,
            email: true,
            createdAt: true,
            customer: {
               select: {
                  id: true,
                  bankAccount: {
                     select: {
                        bankAccountNumber: true,
                        funds: true,
                        transactions: {
                           take: 10,
                           orderBy: {
                              date: "desc" 
                           }, 
                           select: {
                              senderName: true,
                              recieverName: true,
                              funds: true,
                              status: true,
                              date: true
                           },
                        },
                     },
                  },
               },
            },
         },
      });

      if (!user) {
         throw new ApiError(400, "User not exists");
      }

      return user;
   }
}
