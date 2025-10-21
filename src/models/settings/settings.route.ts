import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { settingController } from "./settings.controller";
import { settingValidate } from "./settings.validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";

const route = Router();
route.post(
  "/site",isVerifyAdmin,
  validate(settingValidate.settingSchemaValidation),
  settingController.postSettingController
);
route.get(
  "/site",
  validate(settingValidate.settingSchemaValidation),
  settingController.getSettingsController
);

export const settingRoute:Router=route;