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
  verifyToken,
} from "./auth.utils";
import { db } from "@/config/db";
import { userService } from "../user/user.service";
import { validateEmail } from "../otp/otp.utils";

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
      console.log("coming here",);
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
      const otpVerificationByEmail =process.env.OTP_VERIFICATION_TYPE === "email";
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
          role:role?.toUpperCase(),
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
      if (!existUser || existUser?.role.toUpperCase() !== role?.toUpperCase()) {
        throw new AppError(400, "Invalid User", "Invalid User");
      }
      const token = await generateToken({ email, password, role:role?.toUpperCase() });
      const refreshToken = await generateRefreshToken({
        email,
        password,
        role:role?.toUpperCase(),
      });
      await AuthService.updateUser(email,{refreshToken:refreshToken})
     
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
      const existingUser = await userService.findUserByEmail(decoded?.email);

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


  static refreshTokenController = catchAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const incomingToken = req.cookies?.refreshToken;
  
      if (!incomingToken) {
        throw new AppError(400, "Unauthorized Request", "No refresh token found");
      }
  
      const decoded = await verifyToken(incomingToken, "refresh");
  
      if (!decoded || typeof decoded === "string") {
        throw new AppError(401, "Invalid Token", "Malformed token payload");
      }
      const user=await userService.findUserByEmail(decoded?.email)
  
  
      if (!user) {
        throw new AppError(404, "User not found", "No user for this token");
      }
  
      if (user.refreshToken !== incomingToken) {
        throw new AppError(401, "Invalid Refresh Token", "Token mismatch");
      }
  
      const payload = { id: user.id, email: user.email,password:user?.password, role: user.role?.toUpperCase() };
      const newAccessToken = await generateToken(payload);
      const newRefreshToken = await generateRefreshToken(payload);
      await AuthService.updateUser(user?.email,{ refreshToken: newRefreshToken })
  
  
      const options: any = {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: parseTime(process.env.REFRESH_EXPIRY || "7d"),
      };
  
      res
        .cookie("token", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .status(200)
        .json(
          successResponse("Token refreshed successfully", {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: { id: user.id, email: user.email, role: user.role.toUpperCase() },
          })
        );
    } catch (error: any) {
      next(
        new AppError(
          401,
          "Unauthorized",
          error.message || "Invalid or expired token"
        )
      );
    }
  });


  static resetPasswordController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { identifier, action, otp, password, decoded } = req.body;
  
      if (!decoded?.email) {
        throw new AppError(401, "Unauthorized", "Invalid or missing token data");
      }
  
      const existingUser = await userService.findUserByEmail(decoded.email);
      if (!existingUser) {
        throw new AppError(404, "User not found", "No user found for this email");
      }
  
      const isEmail = validateEmail(identifier);
      const otpVerificationEmail = process.env.OTP_VERIFICATION_TYPE === "email";
  
      if (isEmail) {
        if (!otpVerificationEmail) {
          throw new AppError(
            403,
            "Email OTP not enabled",
            "OTP verification via email is currently disabled."
          );
        }
        if (decoded.email !== identifier) {
          throw new AppError(
            400,
            "Invalid identifier",
            "Email in token and identifier do not match"
          );
        }
      }
  
      const isOTPVerified = await OTPService.verifyOTP(identifier, action, otp);
      if (!isOTPVerified) {
        throw new AppError(400, "Invalid OTP", "OTP verification failed");
      }
  
      if (!password || password.length < 8) {
        throw new AppError(400, "Weak Password", "Password must be at least 6 characters");
      }
  
      const hashedPassword = await generateHashPassword(password);
      await AuthService.updateUser(decoded.email, { password: hashedPassword });
  
      const { success, statusCode, message, data } = successResponse(
        "Password reset successfully",
        {}
      );
  
      return res.status(statusCode).json({ success, statusCode, message, data });
    }
  );
  
}
