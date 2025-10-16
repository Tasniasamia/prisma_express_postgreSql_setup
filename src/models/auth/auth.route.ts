import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { userValidate } from "../user/user.validate";
import { upload } from "@/middlewares/multer";
import { authController } from "./auth.controller";

const route = Router();
route.post(
  "/resister",
  upload.single("image"),
  validate(userValidate.registrationSchemaValidation),
  authController.registrationController
);


export const authRoutes:Router=route;
