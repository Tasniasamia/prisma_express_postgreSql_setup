import { db } from "@/config/db";
import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { generateOTP, sendEmail, validateEmail } from "./otp.utils";
import { OTPService } from "./otp.service";
import { successResponse } from "@/utils/successResponse";
import { userService } from "../user/user.service";

export class OTPController {
  static sendOTPController = catchAsync(async (req: Request, res: Response) => {
    const { identifier, action } = req.body;
    if (!identifier && !action) {
      throw new AppError(
        400,
        "All fields are required",
        "Please provide both identifier and action."
      );
    }
    const validateEmailIdentifier = validateEmail(identifier);
    const otpVerificationEmail =
      await OTPService.findByOtpVerificationTypeEmail();
    if (validateEmailIdentifier && !otpVerificationEmail) {
      throw new AppError(
        404,
        "Invalid Access",
        "OTP verification via email is currently disabled."
      );
    }
    const otp = await generateOTP();

    if (action != "signup") {
        if (otpVerificationEmail) {
            const findUser=await userService.findUserByEmail(identifier);
            if(!findUser){
                throw new AppError(404,'Unauthrized Access','User not Found')
            }
            const findExistUser = await OTPService.findExistUser(
              identifier,
              action
            );
            if (!findExistUser) {
              await sendEmail(identifier, otp);
              await db.otp.create({ data: { identifier, otp, action } });
              const { success, statusCode, message, data } = await successResponse(
                "OTP Send Successfully",
                []
              );
             return  res.status(statusCode).json({success,statusCode, message,data});
            }
            throw new AppError(
              429,
              "OTP Already Sent",
              "Please wait 2 minutes before requesting a new OTP."
            );
          } 
          else {
            const findUser=await userService.findUserByPhone(identifier);
            if(!findUser){
                throw new AppError(404,'Unauthrized Access','User not Found')
            }
            const findExistUser = await OTPService.findExistUser(
                identifier,
                action
              );
              if (!findExistUser) {
                // await sendEmail(identifier, otp);
                await db.otp.create({ data: { identifier, otp, action } });
                const { success, statusCode, message, data } = await successResponse(
                  "OTP Send Successfully",
                  []
                );
               return  res.status(statusCode).json({success,statusCode, message,data});
              }
              throw new AppError(
                429,
                "OTP Already Sent",
                "Please wait 2 minutes before requesting a new OTP."
              );
          }
    } else {
      if (otpVerificationEmail) {
        const findExistUser = await OTPService.findExistUser(
          identifier,
          action
        );
        if (!findExistUser) {
          await sendEmail(identifier, otp);
          await db.otp.create({ data: { identifier, otp, action } });
          const { success, statusCode, message, data } = await successResponse(
            "OTP Send Successfully",
            []
          );
         return  res.status(statusCode).json({success,statusCode, message,data});
        }
        throw new AppError(
          429,
          "OTP Already Sent",
          "Please wait 2 minutes before requesting a new OTP."
        );
      } 
      else {
        const findExistUser = await OTPService.findExistUser(
            identifier,
            action
          );
          if (!findExistUser) {
            // await sendEmail(identifier, otp);
            await db.otp.create({ data: { identifier, otp, action } });
            const { success, statusCode, message, data } = await successResponse(
              "OTP Send Successfully",
              []
            );
           return  res.status(statusCode).json({success,statusCode, message,data});
          }
          throw new AppError(
            429,
            "OTP Already Sent",
            "Please wait 2 minutes before requesting a new OTP."
          );
      }
    }
  });
}
