import { ZodObject } from 'zod';

export class AdminUtility {
   parse(data: Record<string, string>, validator: ZodObject): Record<string, any> {
      return validator.safeParse(data);
   }
}
