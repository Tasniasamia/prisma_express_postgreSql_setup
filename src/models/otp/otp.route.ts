import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { otpValidate } from "./otp.validate";
import { OTPController } from "./otp.controller";

const route=Router();
route.post("/send",validate(otpValidate.otpSchemaValidation),OTPController.sendOTPController);

export const otpRoutes:Router=route;