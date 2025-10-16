import {  Router } from "express";
import {  upload } from "@/middlewares/multer";
import { validate } from "@/middlewares/validate";
import { userValidate } from "../user/user.validate";
import { authController } from "./auth.controller";

const route = Router();

route.post(
  "/resister",
   upload.single('image'),
  validate(userValidate.registrationSchemaValidation),
  authController.registrationController
);
route.post('/deleteImage',authController.deleteImageController);
route.get('/profile',authController.getprofileController);
route.put('/profile',upload.single('image'),authController.updateProfileController)


export const authRoutes: Router = route;
