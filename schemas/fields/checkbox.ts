import * as z from 'zod';

export const CheckboxSettingsSchema = z.object({
  label: z
    .string()
    .min(2, { message: 'Label must contain at least 2 characters' })
    .max(50),
  required: z.boolean().default(false),
});

export type CheckboxSettingsSchemaType = z.infer<typeof CheckboxSettingsSchema>;
