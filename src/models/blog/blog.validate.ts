import { z } from "zod";

export const createBlogZodSchema = z.object({
  title: z
    .record(z.string(), z.string({ message: "Title is required and cannot be empty" })),

  short_description: z
    .record(z.string(), z.string({ message: "Short description is required" })),

  description: z
    .record(z.string(), z.string())
    .optional(),

  categoryId: z
    .string()
    .min(1, { message: "Category ID is required" }),

  status: z
    .boolean({ message: "Status must be true or false" })
    .default(true),

  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .optional(),

  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional(),
});
export const updateBlogZodSchema = z.object({
    id:z.string(),
    title: z
      .record(z.string(), z.string({ message: "Title is required and cannot be empty" })),
  
    short_description: z
      .record(z.string(), z.string({ message: "Short description is required" })),
  
    description: z
      .record(z.string(), z.string())
      .optional(),
  
    categoryId: z
      .string()
      .min(1, { message: "Category ID is required" }),
  
    status: z
      .boolean({ message: "Status must be true or false" })
      .default(true),
  
    image: z
      .string()
      .url({ message: "Image must be a valid URL" })
      .optional(),
  
    thumbnail: z
      .string()
      .url({ message: "Thumbnail must be a valid URL" })
      .optional(),
  })
export type CreateBlogInput = z.infer<typeof createBlogZodSchema>;
