import { db } from "@/config/db";
import { AppError } from "@/errors/appError";

export class OTPService {
//   static findByOtpVerificationTypeEmail = async () => {
  
   
//     const getSettings = await db.setting.findFirst({
//       where: { otp_verification_type: "email" },
//     });
//     if (!getSettings) {
//       return false;
//     }
//     return true;
//   };

  static findExistUser = async (identifier: string, action: string) => {
    const findByIdentifierAction = await db.otp.findFirst({
      where: { identifier: identifier, action: action },
    });
    if (findByIdentifierAction) {
      const then = new Date(findByIdentifierAction?.createdAt).getTime();
      const now = Date.now();
      const diff = (now - then) / (1000 * 60);
      if (diff >= 2) {
        await db.otp.delete({ where: { id: findByIdentifierAction?.id } });
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  static verifyOTP = async (
    identifier: string,
    action: string,
    otp: string
  ) => {
    const findByIdentifierActionOTP = await db.otp.findFirst({
      where: { identifier: identifier, action: action, otp: otp },
    });
    if (findByIdentifierActionOTP) {
      return true;
    }
    return false;
  };

  static createOTP = async (data: any) => {
    const { identifier, otp, action } = data;
    if (!identifier || !otp || !action) {
      throw new AppError(
        400,
        "Missing Fields",
        "identifier, otp, and action are required"
      );
    }
    const newOTP = await db.otp.create({
      data: { identifier, otp, action },
    });
    return newOTP;
  };
}
