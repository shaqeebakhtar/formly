import * as z from 'zod';

export const createFormSchema = z.object({
  name: z.string({ required_error: 'Form name cannot be empty' }),
});
