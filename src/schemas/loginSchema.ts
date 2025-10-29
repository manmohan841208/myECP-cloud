import { z } from 'zod';

export const loginSchema = z.object({
  UserName: z.string().min(1, 'Required Field'),
  password: z.string().min(1, 'Required Field'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
