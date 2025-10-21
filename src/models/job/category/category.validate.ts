import z from "zod";

const JobCategorySchemaValidation = z.object({
    name: z.string({
    message: "Name is required",
  }),
  description: z.string().optional(),
  status:z.string({message:"Status is required"})
});
export type JobCategoryInput = z.infer<typeof JobCategorySchemaValidation>;

export const JobCategoryValidate={
    JobCategorySchemaValidation
}