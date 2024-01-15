import * as z from 'zod';

export const SubTitleSettingsSchema = z.object({
  subTitle: z
    .string()
    .min(2, { message: 'Subtitle must contain at least 2 characters' })
    .max(50),
});

export type SubTitleSettingsSchemaType = z.infer<typeof SubTitleSettingsSchema>;
