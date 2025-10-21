import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { otpValidate } from "./otp.validate";
import { OTPController } from "./otp.controller";
import { isVerify } from "@/middlewares/verifyToken";

const route=Router();
route.post("/send",validate(otpValidate.otpSchemaValidation),OTPController.sendOTPController);
route.post('/verify',validate(otpValidate.otpSchemaValidation),OTPController.verifyOTPController);

export const otpRoutes:Router=route;