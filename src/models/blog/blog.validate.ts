import { z } from "zod";

export const createBlogZodSchema = z.object({
  title: z.record(
    z.string(),
    z.string({ message: "Title is required and cannot be empty" })
  ),

  short_description: z.record(
    z.string(),
    z.string({ message: "Short description is required" })
  ),

  description: z.record(z.string(), z.string()).optional(),

  categoryId: z.string().min(1, { message: "Category ID is required" }),

  status: z.boolean({ message: "Status must be true or false" }).default(true),

  image: z.string().url({ message: "Image must be a valid URL" }).optional(),

  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional(),
});
export const updateBlogZodSchema = z.object({
  id: z.string(),
  title: z.record(
    z.string(),
    z.string({ message: "Title is required and cannot be empty" })
  ),

  short_description: z.record(
    z.string(),
    z.string({ message: "Short description is required" })
  ),

  description: z.record(z.string(), z.string()).optional(),

  categoryId: z.string().min(1, { message: "Category ID is required" }),

  status: z.boolean({ message: "Status must be true or false" }).default(true),

  image: z.string().url({ message: "Image must be a valid URL" }).optional(),

  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional(),
});
export type CreateBlogInput = z.infer<typeof createBlogZodSchema>;
export type updateBlogInput = z.infer<typeof updateBlogZodSchema>;

export const createCommentValidationSchema = z.object({
  commentMessage: z
    .string({
      message: "Comment message is required",
    })
    .min(1, "Comment message cannot be empty"),

  blogId: z.string({
    message: "Blog ID is required",
  }),
});

export type CreateCommentInput = z.infer<typeof createCommentValidationSchema>;
export const createReplyValidationSchema = z.object({
  replyMessage: z
    .string({
      message: "Reply message is required",
    })
    .min(1, "Reply message cannot be empty"),

  commentId: z
    .string({
      message: "Comment ID is required",
    })
    .uuid("Comment ID must be a valid UUID"),

  userId: z
    .string({
      message: "User ID is required",
    })
    .uuid("User ID must be a valid UUID"),
});

export type CreateReplyInput = z.infer<typeof createReplyValidationSchema>;
