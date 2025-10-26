import { z } from 'zod';

export const loginSchema = z.object({
  UserName: z.string().min(1, 'User Id is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
