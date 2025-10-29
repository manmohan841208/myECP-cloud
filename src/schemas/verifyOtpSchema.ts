import { z } from 'zod';

export const verifyOtpSchema = z.object({
  code: z.string().min(1, 'Required field').max(6, 'OTP must be 6 digits'),
  // .regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
