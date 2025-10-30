import { z } from 'zod';

export const securityQuestionSchema = z.object({
  answer: z.string().min(1, 'Required Field'),
  rememberDevice: z.boolean().optional(),
});

export type SecurityQuestionFormValues = z.infer<typeof securityQuestionSchema>;
