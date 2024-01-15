import * as z from 'zod';

export const TitleSettingsSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must contain at least 2 characters' })
    .max(50),
});

export type TitleSettingsSchemaType = z.infer<typeof TitleSettingsSchema>;
