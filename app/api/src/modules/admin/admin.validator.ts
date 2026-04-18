import z from "zod";

export const approveCustomerValidator = z.object({
   senderId: z.string(),
   role: z.literal("Customer"),
});
