import z from 'zod';

export const customerCreationValidator = z.object({
    userId: z.string(),
    flag: z.boolean().default(false)
})

export const transactionCreationValidator = z.object({
   bankAccountNumber: z.number(),
   recieverName: z.string(),
   senderName: z.string(),
   senderId: z.string(),
   recieverId: z.string(),
   funds: z.number()
})
