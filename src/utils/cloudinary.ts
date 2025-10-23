import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { SettingService } from "@/models/settings/settings.service";
import { AppError } from "@/errors/appError";



export const initCloudinary = async () => {

   cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
  });
};


export const uploadCloudinary = async (localdirpath: string,type:string) => {
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
    const isCloudinaryImage = imagePath.includes("res.cloudinary.com");
    if (!isCloudinaryImage) return false;
    const match = imagePath.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-z]+$/i);
    const publicId = match ? match[1] : null;

    if (!publicId) {
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    if (result?.result === "ok" || result?.result === "not found") {
      return true;
    } else {
      return false;
    }

  } catch (error: any) {
    throw new AppError(400,error?.message ,error?.message);

    return false;
  }
};