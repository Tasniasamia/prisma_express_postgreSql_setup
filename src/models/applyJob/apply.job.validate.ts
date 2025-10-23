// applyJob.validation.ts
import { z } from "zod";

const phoneRegex = /^[+\d]?(?:[\d\s\-().]){6,20}$/;

export const applyJobValidation = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").optional().nullable(),
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(20, "Phone number too long")
    .regex(phoneRegex, "Invalid phone number format"),
  cover_letter: z.string().max(5000).optional().nullable(),
  resume: z.string().max(2000).optional().nullable(),
  JobId: z.string().uuid("Invalid JobId"),
});

export type ApplyJobValidationType = z.infer<typeof applyJobValidation>;
export const ApplyJobValidate={
    applyJobValidation
}