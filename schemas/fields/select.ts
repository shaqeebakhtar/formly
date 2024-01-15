import * as z from 'zod';

export const SelectSettingsSchema = z.object({
  label: z
    .string()
    .min(2, { message: 'Label must contain at least 2 characters' })
    .max(50),
  description: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  choices: z.array(z.string()).default([]),
});

export type SelectSettingsSchemaType = z.infer<typeof SelectSettingsSchema>;
