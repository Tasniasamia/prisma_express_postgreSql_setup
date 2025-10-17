import { catchAsync } from "@/utils/catchAsync";
import { Response, Request, NextFunction } from "express";
import { OTPService } from "../otp/otp.service";
import { AuthService } from "./auth.service";
import { successResponse } from "@/utils/successResponse";
import { AppError } from "@/errors/appError";
import { deleteImage, uploadCloudinary } from "@/utils/cloudinary";
import {
  generateHashPassword,
  generateRefreshToken,
  generateToken,
} from "./auth.utils";
import { db } from "@/config/db";
import { userService } from "../user/user.service";

const parseTime = (value: string) => {
  const time = parseInt(value);
  if (value.includes("h")) return time * 60 * 60 * 1000;
  if (value.includes("d")) return time * 24 * 60 * 60 * 1000;
  if (value.includes("m")) return time * 60 * 1000;
  if (value.includes("s")) return time * 1000;
  return 0;
};

export class authController {
  static registrationController = catchAsync(
    async (req: Request, res: Response) => {
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

  static loginController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password, role } = req?.body;
      const existUser = await userService.findUserByEmail(email);
      if (!existUser || existUser?.role !== role) {
        throw new AppError(400, "Invalid User", "Invalid User");
      }
      const token = await generateToken({ email, password, role });
      const refreshToken = await generateRefreshToken({
        email,
        password,
        role,
      });
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: parseTime(process.env.EXPIREIN || "2h"),
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: parseTime(process.env.REFRESH_EXPIRY || "7d"),
      });

      const { success, statusCode, message, data } = successResponse(
        "Login Successfully",
        { refreshToken, token }
      );
      res.status(statusCode).json({ success, statusCode, message, data });
    }
  );

  static getprofileController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const profile = await db.user.findFirst({
        where: { email: req?.body?.decoded?.email },
        omit: { password: true },
      });
      if (!profile) {
        throw new AppError(400, "Invalid User", "Invalid User");
      }
      const { success, statusCode, message, data } = successResponse(
        "User get Successfully",
        profile
      );

      return res.status(200).json({ success, statusCode, message, data });
    }
  );
  static updateProfileController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, decoded, otp, image, password, ...updateData } = req.body;
      const existingUser = await db.user.findFirst({
        where: { email: decoded?.email },
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
        omit: { password: true },
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
      const { url } = await req.body;

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
