import { catchAsync } from "@/utils/catchAsync";
import { Response, Request } from "express";
import { OTPService } from "../otp/otp.service";
import { AuthService } from "./auth.service";
import { successResponse } from "@/utils/successResponse";
import { AppError } from "@/errors/appError";
import { uploadCloudinary } from "@/utils/cloudinary";
import { generateHashPassword } from "./auth.utils";

export class authController {
  static registrationController = catchAsync(
    async (req: Request, res: Response) => {
      console.log("req?.file",req?.files);
      const {
        name,
        email,
        password,
        image='',
        phone,
        role,
        country,
        city,
        state,
        otp,
        zip_code,
        address,
        about,
        is_deleted,
      } = req.body;
      let isOTPVerify;
      const otpVerificationByEmail =
        await OTPService.findByOtpVerificationTypeEmail();
      if (!otpVerificationByEmail) {
        isOTPVerify = await OTPService.verifyOTP(phone, "signup", otp);
      } else {
        isOTPVerify = await OTPService.verifyOTP(email, "signup", otp);
      }


      if (isOTPVerify) {
        const hashPassword=await generateHashPassword(password);
        let imageURL;
        if (req.file?.path) {
          imageURL = await uploadCloudinary(req.file.path);
        }
        console.log("image URL",imageURL);
        console.log("req file path",req.file?.path)
        await AuthService.postUser({
          name,
          email,
          password:hashPassword,
          image:imageURL?.url,
          phone,
          role,
          country,
          city,
          state,
          otp,
          zip_code,
          address,
          about,
          is_deleted,
        });
        const { success, statusCode, message, data } =  successResponse(
          "User Creatd Successfully",
          []
        );
        return  res
          .status(statusCode)
          .json({ success, statusCode, message });
      }

      throw new AppError(400, "Something went wrong", "Authentication Failed");
    }
  );
}
