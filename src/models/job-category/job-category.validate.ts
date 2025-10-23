import { languageEnum } from "@/utils/constants";
import z from "zod";

const jobCatgorySchemaValidation = z.object({
  name: z.record(z.string(),z.string()).refine((val) => {
        console.log("val",val);
      return Object.keys(val).every((t) => 
        languageEnum?.options?.includes(t as any)
      )
    },      { message: "Invalid language key in name field" }
),
  description:  z.record(z.string(),z.string()).refine((val) => {
    console.log("val",val);
 return Object.keys(val).every((t) => 
    languageEnum?.options?.includes(t as any)
  )

},  { message: "Invalid language key in name field" }
),
  status: z.boolean({
    message: "active is required",
  }).default(true),
});
export type jobCategoryInput = z.infer<typeof jobCatgorySchemaValidation>;
export const jobCategoryValidate = {
  jobCatgorySchemaValidation,
};



const updatejobCatgorySchemaValidation = z.object({
  id:z.string(),
  name: z.record(z.string(),z.string()).refine((val) => {
        console.log("val",val);
      return Object.keys(val).every((t) => 
        languageEnum?.options?.includes(t as any)
      )
    },      { message: "Invalid language key in name field" }
),
  description:  z.record(z.string(),z.string()).refine((val) => {
    console.log("val",val);
 return Object.keys(val).every((t) => 
    languageEnum?.options?.includes(t as any)
  )

},  { message: "Invalid language key in name field" }
),
  status: z.boolean({
    message: "active is required",
  }),
});
export type updatejobCategoryInput = z.infer<typeof updatejobCatgorySchemaValidation>;
export const updatejobCategoryValidate = {
  updatejobCatgorySchemaValidation,
};
