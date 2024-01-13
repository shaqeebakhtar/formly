import * as z from 'zod';

export const createFormSchema = z.object({
  name: z
    .string({ required_error: 'Form name cannot be empty' })
    .min(3, { message: 'Form name must be at least 3 characters' }),
});
