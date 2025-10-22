import { languageEnum } from "@/utils/constants";
import z from "zod";

const settingLanguageSchemaValidation = z.object({
    name: z.string({
        message: "name is required",
      }),
      code: languageEnum.optional(),
      rtl: z.string({
        message: "rtl is required",
      }),
      translations: z.string({
        message: "translations is required",
      }).optional(),
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
    id:z.string('id is required'),
    name: z.string({
        message: "name is required",
      }),
      code: z.string({
        message: "code is required",
      }),
      rtl: z.string({
        message: "rtl is required",
      }),
      translations: z.string({
        message: "translations is required",
      }).optional(),
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