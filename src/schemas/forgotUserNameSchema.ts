import { z } from 'zod';

export const forgotUserIdSchema = z.object({
  LastName: z
    .string()
    .min(1, 'Required Field')
    .max(48, 'Last Name cannot exceed 48 characters'),
  SSNLast5: z
    .string()
    .length(5, 'SSN must be exactly 5 digits')
    .regex(/^\d{5}$/, 'SSN must be numeric'),
  dob: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
      'Date of Birth must be in MM/DD/YYYY format',
    )

    .refine(
      (date) => {
        const [month, day, year] = date.split('/');
        const inputDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate(),
        );
        return inputDate <= eighteenYearsAgo;
      },
      {
        message: 'You must be at least 18 years old',
      },
    ),
  captchaInput: z.string().min(1, 'Required Field'),
});

export type ForgotUserIdFormValues = z.infer<typeof forgotUserIdSchema>;
