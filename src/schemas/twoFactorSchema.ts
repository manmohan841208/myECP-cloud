import { z } from 'zod';

export const twoFactorSchema = z.object({
  otpOption: z
    .union([z.literal('Email'), z.literal('SMS'), z.literal('')])
    .refine((val) => val !== '', {
      message: 'Please select a delivery method',
    }),
});

export type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;
