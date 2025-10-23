import { z } from "zod";




const stripeCredentialsSchema = z.object({
  stripe_publishable_key: z.string().min(1),
  stripe_secret_key: z.string().min(1),
  stripe_webhook_secret: z.string().min(1),
}).strict();

const stripeSchema = z.object({
  credentials: stripeCredentialsSchema,
  is_active: z.union([z.boolean(), z.string()]).optional(), // your model used string; accept boolean too
  logo: z.string().optional(),
  name: z.string().optional(),
}).strict().optional();

const paypalCredentialsSchema = z.object({
  paypal_base_url: z.string().url().optional(),
  paypal_client_id: z.string().min(1).optional(),
  paypal_secret_key: z.string().min(1).optional(),
}).strict();

const paypalSchema = z.object({
  credentials: paypalCredentialsSchema,
  is_active: z.boolean().optional(),
  logo: z.string().optional(),
  name: z.string().optional(),
}).strict().optional();

const razorpayCredentialsSchema = z.object({
  razorpay_key_id: z.string().min(1),
  razorpay_key_secret: z.string().min(1),
}).strict();

const razorpaySchema = z.object({
  credentials: razorpayCredentialsSchema,
  is_active: z.boolean().optional(),
  logo: z.string().optional(),
  name: z.string().optional(),
}).strict().optional();

const mollieCredentialsSchema = z.object({
  mollie_api_key: z.string().min(1),
}).strict();

const mollieSchema = z.object({
  credentials: mollieCredentialsSchema,
  is_active: z.boolean().optional(),
  logo: z.string().optional(),
  name: z.string().optional(),
}).strict().optional();

const socialMediaLinkItemSchema = z.object({
  name: z.string().min(1, "social_media_link.name is required"),
  link: z.string().url("social_media_link.link must be a valid URL"),
}).strict();

const socialMediaLinksSchema = z.array(socialMediaLinkItemSchema).optional();

export const settingSchemaValidation = z.object({
  site_name: z.string().max(255).optional(),
  site_email: z.string().email().optional(),
  site_phone: z.string().max(50).optional(),
  site_logo: z.string().url().optional(),
  site_address: z.string().max(500).optional(),
  site_description: z.string().max(2000).optional(),
  site_footer: z.string().max(1000).optional(),
  decoded: z.any().optional(),
  client_side_url: z.string().url().optional(),
  server_side_url: z.string().url().optional(),
  uploadType:z.string().optional(),

  stripe: stripeSchema,
  paypal: paypalSchema,
  razorpay: razorpaySchema,
  mollie: mollieSchema,

  social_media_link: socialMediaLinksSchema,

  id: z.string().uuid().optional(),
  createdAt: z.string().optional(), 
  updatedAt: z.string().optional(),
}).strict();

 export type SettingInput = z.infer<typeof settingSchemaValidation>;


export const settingValidate={
    settingSchemaValidation
}