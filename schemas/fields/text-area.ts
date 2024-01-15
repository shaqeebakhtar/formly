import * as z from 'zod';

export const TextAreaSettingsSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export type TextAreaSettingsSchemaType = z.infer<typeof TextAreaSettingsSchema>;
