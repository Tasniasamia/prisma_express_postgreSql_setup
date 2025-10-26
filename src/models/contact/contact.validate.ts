import { z } from "zod";

export const createContactValidationSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),

  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be a valid email address" }),

  subject: z
    .string({ message: "Subject is required" })
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(150, { message: "Subject must be at most 150 characters" }),
    reply: z
    .string({ message: "reply is required" })
    .min(3, { message: "reply must be at least 3 characters" })
    .max(150, { message: "reply must be at most 150 characters" }).optional(),
  message: z
    .string({ message: "Message is required" })
    .min(5, { message: "Message must be at least 5 characters" })
    .max(2000, { message: "Message must be at most 2000 characters" }),
});

// exported type for convenience
export type CreateContactInput = z.infer<typeof createContactValidationSchema>;
export const updateContactValidationSchema = z.object({
    id:z.string(),
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(100, { message: "Name must be at most 100 characters" }).optional(),
  
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email must be a valid email address" }).optional(),
  
    subject: z
      .string({ message: "Subject is required" })
      .min(3, { message: "Subject must be at least 3 characters" })
      .max(150, { message: "Subject must be at most 150 characters" }).optional(),
      reply: z
      .string({ message: "reply is required" })
      .min(3, { message: "reply must be at least 3 characters" })
      .max(150, { message: "reply must be at most 150 characters" }),
    
    message: z
      .string({ message: "Message is required" })
      .min(5, { message: "Message must be at least 5 characters" })
      .max(2000, { message: "Message must be at most 2000 characters" }).optional(),
  });
  
  // exported type for convenience
  export type updateContactInput = z.infer<typeof createContactValidationSchema>;