import { db } from "@/config/db";
import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { generateOTP, validateEmail } from "./otp.utils";
import { OTPService } from "./otp.service";

export class OTPController{
    static sendOTPController=catchAsync(async(req:Request,res:Response)=>{
        const {identifier,action}=req.body;
        if(!identifier && !action){
            throw new AppError(400,'All fields are required','All fields are required')
        }
        const validateEmailIdentifier=validateEmail(identifier);
        const otpVerificationEmail=await OTPService.findByOtpVerificationTypeEmail();
        if(validateEmailIdentifier && !otpVerificationEmail ){
            throw new AppError(404,'Invalid Aceess','Invalid OTP Verification Type')
        }
       const otp=await generateOTP();

       if(action !='signup'){

       }
       else{
        if(otpVerificationEmail){
          const findExistUser=await OTPService.findExistUser(identifier,action);
          if(!findExistUser){
            
          }

        }
        else{

        }
       }



    })
}