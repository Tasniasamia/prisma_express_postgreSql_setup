import { z } from "zod";

export const MessageTypeEnum = z.enum(["TEXT", "IMAGE", "FILE"]);

export const messageSchema = z.object({
  from: z.string().min(1, "from is required").max(255),
  to: z.string().min(1, "to is required").max(255),
  messageType: MessageTypeEnum,
  message: z.string().min(1, "message cannot be empty"),
  isRead: z.boolean().optional().default(false),
});

export type MessageInput = z.infer<typeof messageSchema>;
