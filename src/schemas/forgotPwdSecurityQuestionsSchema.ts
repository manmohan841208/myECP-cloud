// schemas/securityQuestionsSchema.ts
import { z } from 'zod';

export const securityQuestionsSchema = z.object({
  Answer1: z.string().min(1, 'Answer to Question 1 is required'),
  Answer2: z.string().min(1, 'Answer to Question 2 is required'),
});

export type SecurityQuestionsFormValues = z.infer<
  typeof securityQuestionsSchema
>;
