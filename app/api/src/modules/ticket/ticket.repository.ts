import { client } from "@workspace/db/client";

export class TicketRepository {
   async createTicket(data: {
      role: "Customer" | "Analyst";
      userId: string;
      isStaff: boolean;
   }) {
      return await client.ticket.create({
         data: {
            role: data.role,
            userId: data.userId,
            isStaff: data.isStaff,
         },
      });
   }

   async getUserTickets() {
      return await client.ticket.findMany({
         where: {
            isStaff: {
               equals: false,
            },
         },
      });
   }

   async getStaffTickets() {
      return await client.ticket.findMany({
         where: {
            isStaff: {
               equals: true,
            },
         },
      });
   }

   async approveTicket(userId: string) {
      return await client.ticket.update({
         where: { userId },
         data: { isApproved: "APPROVED" },
      });
   }

   async rejectTicket(userId: string) {
      return await client.ticket.update({
         where: { userId },
         data: { isApproved: "REJECT" },
      });
   }
}
