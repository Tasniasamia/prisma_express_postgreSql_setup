import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { SettingService } from "@/models/settings/settings.service";
import { AppError } from "@/errors/appError";



export const initCloudinary = async () => {
  // const environmentVariable = await SettingService.findCloudinarySettings();

  // if (!environmentVariable?.cloud_config) {
  //   throw new AppError(400,'Cloudinary configuration not found in database.',"Cloudinary configuration not found in database.");
  // }
   cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
  });
};


export const uploadCloudinary = async (localdirpath: string) => {
  try {
    if (!localdirpath) return null;
    const response = await cloudinary.uploader.upload(localdirpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localdirpath); 
    return response;
  } catch (error: any) {
   if (fs.existsSync(localdirpath)) fs.unlinkSync(localdirpath);
    throw new AppError(400,error?.message ,error?.message);
  }
};




export const deleteImage:any = async (imagePath: string): Promise<boolean> => {
  try {
    // Cloudinary URL কিনা চেক করো
    const isCloudinaryImage = imagePath.includes("res.cloudinary.com");
    if (!isCloudinaryImage) return false;

    // public_id extract করো
    const match = imagePath.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-z]+$/i);
    const publicId = match ? match[1] : null;

    if (!publicId) {
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);

    // যদি সফলভাবে delete হয়
    if (result?.result === "ok" || result?.result === "not found") {
      // "not found" মানে image আগেই delete হয়ে গেছে
      return true;
    } else {
      return false;
    }

  } catch (error: any) {
    throw new AppError(400,error?.message ,error?.message);

    return false;
  }
};