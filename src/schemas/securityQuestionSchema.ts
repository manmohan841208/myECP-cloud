import { z } from 'zod';

export const securityQuestionSchema = z.object({
  answer: z
    .string()
    .min(1, 'Please provide an answer to the security question.'),
  rememberDevice: z.boolean().optional(),
});

export type SecurityQuestionFormValues = z.infer<typeof securityQuestionSchema>;
