import { ZodObject } from 'zod';

export class Utility {
   parse(data: Record<string, string>, validator: ZodObject): Record<string, any> {
      return validator.safeParse(data);
   }
}
