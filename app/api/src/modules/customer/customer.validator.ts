import z from 'zod';

export const customerCreationValidator = z.object({
    userId: z.string(),
    flag: z.boolean().default(false)
})