import { languageEnum } from "@/utils/constants";
import z from "zod";

const courseCatgorySchemaValidation = z.object({
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
export type courseCategoryInput = z.infer<typeof courseCatgorySchemaValidation>;
export const courseCategoryValidate = {
  courseCatgorySchemaValidation,
};



const updateCourseCatgorySchemaValidation = z.object({
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
export type updateCourseCategoryInput = z.infer<typeof updateCourseCatgorySchemaValidation>;
export const updateCourseCategoryValidate = {
    updateCourseCatgorySchemaValidation,
};
