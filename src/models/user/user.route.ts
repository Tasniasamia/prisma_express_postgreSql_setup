import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { userValidate } from "./user.validate";
import { userController } from "./user.controller";

const router = Router();
router.post(
  "/resister",
  validate(userValidate.registrationSchemaValidation),
  userController.registrationController
);

export const userRoutes:Router=router;