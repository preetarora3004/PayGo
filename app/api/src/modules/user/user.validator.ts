import z from "zod";

export const userDTOValidator = z.object({
   email: z.email(),
   name: z.string().min(1),
   password: z.string().min(8),
   role: z.enum(["Customer", "Analyst"]),
});

export const userTokenValidator = z.object({
   id: z.string(),
   email: z.email(),
   role: z.enum(["Admin", "Customer", "Analyst"]),
});

export const userSignInValidator = z.object({
   email: z.email(),
   password: z.string().min(1),
});
