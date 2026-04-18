import { client } from "@workspace/db/client";
export class CustomerRepository {
    async createCustomer(data: {
        userId: string,
        flag: boolean
    }) {
        return await client.customer.create({ data })
    }

    async getCustomer() {
        return await client.customer.findMany();
    }

    async getCustomerByUserId(userId: string) {
        return await client.customer.findUnique({
            where: {
                userId
            }
        })
    }

   async deleteCustomer(userId: string) {
      return await client.customer.delete({
         where: {userId},
         select: {
            id: true
         }
      })
   }
}
