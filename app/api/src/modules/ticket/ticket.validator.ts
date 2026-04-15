import z from 'zod';

export const ticketCreationValidator = z.object({
   role: z.enum(['Customer', 'Analyst']),
   userId: z.string(),
   isStaff: z.boolean()
})
