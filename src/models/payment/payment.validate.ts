import { z } from "zod";
export const paymentSchema = z.object({
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      const v = val.trim();
      if (v === "") return NaN;
      return Number(v);
    }
    return val;
  }, z.number({ message: "amount must be a number" }).positive()),

  status: z
    .string()
    .optional()
    .refine(
      (s) => s === undefined || ["open", "pending", "authorized", "paid", "failed", "expired", "canceled", "refunded", "charged_back"].includes(s),
      { message: "Invalid status value" }
    ),

  payment_method: z.string().min(1, "payment_method is required"),
  currency_code: z
    .string()
    .min(2, "currency_code is required")
    .transform((s) => s.toUpperCase()),

  course_id: z.string().min(1, "course_id is required"),
  user_id: z.string().min(1, "user_id is required"),
});

export type paymentInput=z.infer<typeof paymentSchema>
