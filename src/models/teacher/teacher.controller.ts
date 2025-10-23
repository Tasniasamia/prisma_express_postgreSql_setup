import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service";
import { AppError } from "@/errors/appError";
import { uploadCloudinary } from "@/utils/cloudinary";
import { db } from "@/config/db";

export class TeacherController {
    static findTeacherControllerAdmin = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
          } = req.query as any;
      
          const where: any = {
              
              role:"TEACHER",
              ...(search
                ? {
                    OR: [
                      { name: { contains: search, mode: "insensitive" } },
                      { email: { contains: search, mode: "insensitive" } },
                    ],
                  }
                : {}),
           
          };
      
          const data = await globalService.getDocuments({
            model: "user",
            filter: where,
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
            omit:{password:true}
          });
      
          res.status(200).json({
            success: true,
            message: "data fetched successfully",
            data,
          });
        }
      );
      
      static updateTeacherProfileController = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
          
          const reqbody=await req.body;
          console.log(req?.body)
          const existingUser = await userService.findUserByEmail(reqbody?.email);
    
          if (!existingUser) {
            throw new AppError(404, "User not found", "User not found");
          }
    
          let imageURL;
          if (req.file?.path) {
            imageURL = await uploadCloudinary(req.file.path,'image');
          }
    
          const updatedUser = await db.user.update({
            where: { id: existingUser.id },
            data: {
              ...reqbody,
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
      
  
}
