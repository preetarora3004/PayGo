import { Request, Response } from "express";
import { TicketService } from "./ticket.service";
import { TicketUtility } from "./ticket.utility";
import { ApiError } from "@workspace/api/utils/error";

const service = new TicketService();
const utility = new TicketUtility();

export class TicketController {
   async createTicket(req: Request, res: Response) {
      const userId = req.user?.id;
      const data = utility.parse({
         ...req.body,
         userId,
      });

      const ticket = await service.createTicket(data);

      return res.status(200).json({
         success: true,
         data: {
            ticket,
         },
      });
   }

   async getUsersTicket(_: Request, res: Response) {
      const usersTicket = await service.getUserTickets();

      return res.status(200).json({
         success: true,
         data: {
            usersTicket,
         },
      });
   }

   async getStaffsTicket(_: Request, res: Response) {
      const staffsTicket = await service.getUserTickets();

      return res.status(200).json({
         success: true,
         data: {
            staffsTicket,
         },
      });
   }

   async approveTicket(req: Request, res: Response) {
      const id = req.params.id as string;

      if (!id) throw new ApiError(400, "Invalid id");

      const isApproved = await service.approveTicket(id);

      return res.status(200).json({
         success: isApproved,
      });
   }

   async rejectTicket(req: Request, res: Response) {
      const id = req.params.id as string;

      if (!id) throw new ApiError(400, "Invalid id");

      const isRejected = await service.rejectTicket(id);

      return res.status(200).json({
         success: isRejected,
      });
   }
}
