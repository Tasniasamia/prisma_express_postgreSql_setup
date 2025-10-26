import { languageEnum } from "@/utils/constants";
import z from "zod";

const blogCatgorySchemaValidation = z.object({
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
export type blogCategoryInput = z.infer<typeof blogCatgorySchemaValidation>;
export const blogCategoryValidate = {
  blogCatgorySchemaValidation,
};



const updateblogCatgorySchemaValidation = z.object({
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
export type updateblogCategoryInput = z.infer<typeof updateblogCatgorySchemaValidation>;
export const updateblogCategoryValidate = {
  updateblogCatgorySchemaValidation,
};
