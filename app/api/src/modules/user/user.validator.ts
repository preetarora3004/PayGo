import z from 'zod';

export const userDTOValidator = z.object({
   email: z.email(),
   name: z.string().min(1),
   password: z.string().min(8)
})

export const userTokenValidator = z.object({
   id: z.string(),
   email: z.email()
})

export const userSignInValidator = z.object({
   email: z.email(),
   password: z.string().min(1)
})
