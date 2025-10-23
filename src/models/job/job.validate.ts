import { languageEnum } from "@/utils/constants";
import { z } from "zod";

const VALID_LANG_KEYS = languageEnum?.options ?? ["en", "bn"];

const recordOfStrings = () => z.record(z.string(), z.string());


const validateLangKeys = (obj?: Record<string, string> | undefined) => {
  if (!obj) return true; 
  return Object.keys(obj).every((k) => VALID_LANG_KEYS.includes(k as any));
};

export const createJobSchema = z.object({
  title: recordOfStrings().refine(validateLangKeys, { message: "Invalid language key in title" }),
  company_name: recordOfStrings().refine(validateLangKeys, { message: "Invalid language key in company_name" }),
  job_position: recordOfStrings().refine(validateLangKeys, { message: "Invalid language key in job_position" }),
  categoryId: z.string().min(1, "categoryId is required"),
  category: z.any().optional(), 
  vacancy: z.number().int().positive().optional(),
  job_context: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_context" }),
  job_responsibility: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_responsibility" }),
  educational_requirement: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in educational_requirement" }),
  additional_requirements: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in additional_requirements" }),
  salary: z.number().int().nonnegative().optional(),
  deadLine: z.string().optional(), 
  status: z.boolean(),
  jobType: z.string(),
  author_name: recordOfStrings().refine(validateLangKeys, { message: "Invalid language key in author_name" }),
  job_location: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_location" }),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

export const updateJobSchema = z.object({
  id: z.string().min(1, "id is required"),
  title: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in title" }),
  company_name: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in company_name" }),
  job_position: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_position" }),
  categoryId: z.string().optional(),
  category: z.any().optional(),
  vacancy: z.number().int().positive().optional(),
  job_context: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_context" }),
  job_responsibility: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_responsibility" }),
  educational_requirement: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in educational_requirement" }),
  additional_requirements: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in additional_requirements" }),
  salary: z.number().int().nonnegative().optional(),
  deadLine: z.string().optional(),
  status: z.boolean().optional(),
  jobType: z.string(),
  author_name: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in author_name" }),
  job_location: recordOfStrings().optional().refine(validateLangKeys, { message: "Invalid language key in job_location" }),
});

export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export const jobValidate = {
  createJobSchema,
  updateJobSchema,
};
