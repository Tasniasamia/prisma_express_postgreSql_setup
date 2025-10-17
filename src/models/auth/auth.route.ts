import {  Router } from "express";
import {  upload } from "@/middlewares/multer";
import { validate } from "@/middlewares/validate";
import { userValidate } from "../user/user.validate";
import { authController } from "./auth.controller";
import { authValidate } from "./auth.validate";
import { isVerify } from "@/middlewares/verifyToken";

const route = Router();

route.post(
  "/resister",
   upload.single('image'),
  validate(userValidate.registrationSchemaValidation),
  authController.registrationController
);
route.post('/login',validate(authValidate.loginSchemaValidation),authController.loginController)
route.post('/deleteImage',authController.deleteImageController);
route.get('/profile',isVerify,authController.getprofileController);
route.put('/profile',upload.single('image'),isVerify,authController.updateProfileController);
route.get('/refreshToken',authController.refreshTokenController);
route.put('/resetPassword',isVerify,authController.resetPasswordController)

export const authRoutes: Router = route;
