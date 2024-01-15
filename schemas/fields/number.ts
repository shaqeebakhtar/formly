import * as z from 'zod';

export const NumberSettingsSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

export type NumberSettingsSchemaType = z.infer<typeof NumberSettingsSchema>;
