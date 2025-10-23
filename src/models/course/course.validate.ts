import { z } from "zod";

const recordStringSchema = z.record(
  z.string(),
  z.string().min(1, "Value cannot be empty")
);

export const courseValidation = z.object({
  name: recordStringSchema.optional(),
  price: z.number().positive("Price must be positive").optional(),
  rate: z.number().min(0).max(5).optional(),
  description: recordStringSchema.optional(),
  duration: z.string().optional(),
  time: z.string().optional(),
  days: z
    .record(z.string(), recordStringSchema)
    .optional()
    .refine(
      (val) => val === undefined || Object.keys(val).length > 0,
      "Days object cannot be empty"
    ),
  place: z.string().optional(),
  sit: z.number().int().positive("Sit must be a positive integer").optional(),
  enrollment: z.number().int().nonnegative().optional(),
  status: z.boolean().optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  categoryId: z.string().uuid("Invalid category ID").optional(),
});

export const updateCourseValidation = courseValidation.extend({
  id: z.string().uuid("Course ID is required for update"),
});
