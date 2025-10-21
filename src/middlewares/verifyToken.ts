import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/models/auth/auth.utils";
import { AppError } from "@/errors/appError";

export const isVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, refreshToken } = req.cookies;
  
      if (!token || !refreshToken) {
        throw new AppError(401, "Unauthorized", "Token missing in cookies");
      }
  
      const decoded = await verifyToken(token, "access");
  
      req.body = {
        ...req.body,
        decoded: decoded
      }
        
      next();
    } catch (error: any) {
      next(new AppError(401, "Unauthorized", error.message || "Invalid token"));
    }
  };
  

const verifyCookies = (req: Request): any => {
  const { token } = req.cookies;

  if (!token) {
    throw new AppError(401, "Unauthorized", "No token found in cookies");
  }

  try {
    const decoded = verifyToken(token, "access");
    return decoded;
  } catch (error: any) {
    throw new AppError(401, "Unauthorized", "Invalid or expired token");
  }
};

export const isVerifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = verifyCookies(req);

    if (decoded.role !== "USER" && decoded.role !== "ADMIN") {
      throw new AppError(403, "Forbidden", "User not authorized");
    }

    req.body = {
        ...req.body,
        decoded: decoded
      }
      
    next();
  } catch (error) {
    next(error);
  }
};

export const isVerifyAdmin = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = await verifyCookies(req);
   console.log("decoded",decoded);
    if (decoded?.role !== "ADMIN") {
      throw new AppError(403, "Forbidden", "Admin access only");
    }

    req.body = {
        ...req.body,
        decoded: decoded
      }
      
    next();
  } catch (error) {
    next(error);
  }
};
