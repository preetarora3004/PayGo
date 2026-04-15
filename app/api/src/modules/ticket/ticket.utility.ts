import { ticketCreationValidator } from "./ticket.validator";
import { TicketDTOCreation } from "./ticket.types";
import { ApiError } from "@workspace/api/utils/error";

export class TicketUtility {
   parse(data: TicketDTOCreation) {
      const parsed = ticketCreationValidator.safeParse(data);

      if (!parsed.success) throw new ApiError(400, "Invalid request syntax");
      return parsed.data;
   }
}
