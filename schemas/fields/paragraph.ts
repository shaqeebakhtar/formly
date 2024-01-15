import * as z from 'zod';

export const ParagraphSettingsSchema = z.object({
  paragraph: z
    .string()
    .min(2, { message: 'Paragraph must contain at least 2 characters' }),
});

export type ParagraphSettingsSchemaType = z.infer<
  typeof ParagraphSettingsSchema
>;
