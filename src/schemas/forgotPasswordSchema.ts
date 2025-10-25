import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  UserName: z.string().min(1, 'User ID is required'),
  SSNLast5: z
    .string()
    .length(5, 'SSN must be exactly 5 digits')
    .regex(/^\d{5}$/, 'SSN must be numeric'),

  DOB: z.string().refine(
    (val) => {
      const today = new Date();
      const inputDate = new Date(val);
      return inputDate <= today;
    },
    {
      message: 'Date of Birth cannot be in the future',
    },
  ),

  captchaInput: z.string().min(1, 'Captcha is required'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
