// schemas/resetPasswordSchema.ts
import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    NewPassword: z.string().min(8, 'Password must be at least 8 characters'),
    ConfirmPassword: z.string().min(8, 'Confirm Password is required'),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: 'Passwords do not match',
    path: ['ConfirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
