// schemas/resetPasswordSchema.ts
import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    NewPassword: z
      .string()
      .min(8, 'Password does not meet all requirements')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        'Password does not meet all requirements',
      ),
    ConfirmPassword: z.string().min(8, 'Required Field'),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: 'Your passwords do not match. Please re-enter your passwords.',
    path: ['ConfirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
