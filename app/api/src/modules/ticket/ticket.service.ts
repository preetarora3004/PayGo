import { TicketDTOCreation } from "./ticket.types";
import { TicketRepository } from "./ticket.repository";
import { ApiError } from "@workspace/api/utils/error";

export class TicketService {
   private repo = new TicketRepository();

   async createTicket(data: TicketDTOCreation) {
      return await this.repo.createTicket(data);
   }

   async getUserTickets() {
      const userTickets = await this.repo.getUserTickets();
      if (userTickets.length === 0)
         throw new ApiError(404, "No ticket exists for user");

      return userTickets;
   }

   async getStaffTickets() {
      const staffTickets = await this.repo.getStaffTickets();
      if (staffTickets.length === 0)
         throw new ApiError(404, "No ticket exists for staff");

      return staffTickets;
   }

   async approveTicket(userId: string) {
      const approvedTicket = await this.repo.approveTicket(userId);
      if (approvedTicket.isApproved !== "APPROVED")
         throw new ApiError(400, "Ticket not found");

      return true;
   }

   async rejectTicket(userId: string) {
      const rejectedTicket = await this.repo.rejectTicket(userId);
      if (rejectedTicket.isApproved !== "REJECT")
         throw new ApiError(400, "Ticket not found");

      return true;
   }
}
