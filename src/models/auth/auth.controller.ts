import { catchAsync } from "@/utils/catchAsync";
import { Response, Request, NextFunction } from "express";
import { OTPService } from "../otp/otp.service";
import { AuthService } from "./auth.service";
import { successResponse } from "@/utils/successResponse";
import { AppError } from "@/errors/appError";
import { deleteImage, uploadCloudinary } from "@/utils/cloudinary";
import { generateHashPassword } from "./auth.utils";
import { db } from "@/config/db";
import { userService } from "../user/user.service";

export class authController {
  static registrationController = catchAsync(
    async (req: Request, res: Response) => {
      console.log("req?.file", req?.files);
      const {
        name,
        email,
        password,
        image = "",
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
        const hashPassword = await generateHashPassword(password);
        let imageURL;
        if (req.file?.path) {
          imageURL = await uploadCloudinary(req.file.path);
        }
        console.log("image URL", imageURL);
        console.log("req file path", req.file?.path);
        await AuthService.postUser({
          name,
          email,
          password: hashPassword,
          image: imageURL?.url,
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
        const { success, statusCode, message, data } = successResponse(
          "User Creatd Successfully",
          []
        );
        return res.status(statusCode).json({ success, statusCode, message });
      }

      throw new AppError(400, "Something went wrong", "Authentication Failed");
    }
  );

  static getprofileController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const profile = await db.user.findFirst({
        where: { id: req?.params?.id },
      });
      return res.status(200).json({ data: profile });
    }
  );
  static updateProfileController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("req.body", req.body);
      const { email, image,password, ...updateData } = req.body;
      const existingUser = await db.user.findFirst({
        where: { email },
      });
      
      if (!existingUser) {
        throw new AppError(404, "User not found", "User not found");
      }
  
      let imageURL;
      if (req.file?.path) {
        imageURL = await uploadCloudinary(req.file.path);
      }
      
  
      const updatedUser = await db.user.update({
        where: { id: existingUser.id },
        omit:{password:true},
        data: {
          ...updateData,
          image: imageURL?.url || existingUser.image,
        },
      });
  
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    }
  );
  
  static deleteImageController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("first coming here");
      const { url } = await req.body;
      console.log("url", await req.body);

      if (!url) {
        throw new AppError(400, "Missing required field", "URL not provided");
      }

      const is_deleted = await deleteImage(url);
      if (!is_deleted) {
        throw new AppError(
          400,
          "Image deletion failed",
          "Failed to delete image from Cloudinary"
        );
      }

      const dbAny = db as any;
      const allModels = Object.keys(dbAny).filter(
        (key) =>
          typeof dbAny[key] === "object" &&
          !["_engine", "$transaction", "$disconnect", "$connect"].includes(key)
      );

      let updated = false;

      // 🔍 Loop through every Prisma model
      for (const modelName of allModels) {
        const model = dbAny[modelName];

        try {
          // Find the first record that contains this URL in any string field
          const records = await model.findMany();

          for (const record of records) {
            for (const field in record) {
              const value = record[field];
              if (typeof value === "string" && value.includes(url)) {
                // ✅ Found the URL in some field
                await model.update({
                  where: { id: record.id },
                  data: { [field]: null },
                });
                updated = true;
                break;
              }
            }
            if (updated) break;
          }

          if (updated) break;
        } catch (err) {
          // Skip tables without matching structure
          continue;
        }
      }

      if (!updated) {
        throw new AppError(
          404,
          "Image not found",
          "No matching record found in any table"
        );
      }

      const { success, statusCode, message } = successResponse(
        "Image deleted successfully",
        {}
      );
      return res.status(statusCode).json({ success, statusCode, message });
    }
  );
}
