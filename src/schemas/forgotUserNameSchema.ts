import { z } from 'zod';

export const forgotUserIdSchema = z.object({
  LastName: z.string().min(1, 'Last Name is required'),
  SSNLast5: z
    .string()
    .length(5, 'SSN must be exactly 5 digits')
    .regex(/^\d{5}$/, 'SSN must be numeric'),
  DOB: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format'),
  captchaInput: z.string().min(1, 'Captcha is required'),
});

export type ForgotUserIdFormValues = z.infer<typeof forgotUserIdSchema>;
