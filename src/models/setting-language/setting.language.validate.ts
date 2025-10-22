import { languageEnum } from "@/utils/constants";
import z from "zod";

const settingLanguageSchemaValidation = z.object({
    name: z.string({
        message: "name is required",
      }),
      code: languageEnum.optional(),
      rtl: z.boolean({
        message: "rtl is required",
      }),
      translations: z.array(z.object({key:z.string(),value:z.string()})).optional(),
      active: z.boolean({
        message: "active is required",
      }).optional(),
      default: z.boolean({
        message: "default is required",
      }).optional(),
});
export type settingLanguageInput = z.infer<typeof settingLanguageSchemaValidation>;

export const settingLanguageValidate = {
    settingLanguageSchemaValidation,
};

const updatesettingLanguageSchemaValidation = z.object({
    id:z.string({
      message: "id is required",
    }),
    name: z.string({
        message: "name is required",
      }),
      code: languageEnum.optional(),
      rtl: z.boolean({
        message: "rtl is required",
      }),
      translations: z.array(z.object({key:z.string(),value:z.string()})).optional(),
      active: z.boolean({
        message: "active is required",
      }).optional(),
      default: z.boolean({
        message: "default is required",
      }).optional(),
});
export type updatesettingLanguageInput = z.infer<typeof updatesettingLanguageSchemaValidation>;

export const updatesettingLanguageValidate = {
    updatesettingLanguageSchemaValidation,
};