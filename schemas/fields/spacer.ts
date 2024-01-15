import * as z from 'zod';

export const SpacerSettingsSchema = z.object({
  height: z.number().min(5).max(200),
});

export type SpacerSettingsSchemaType = z.infer<typeof SpacerSettingsSchema>;
