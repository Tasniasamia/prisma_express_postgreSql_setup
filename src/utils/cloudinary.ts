import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { SettingService } from "@/models/settings/settings.service";
import { AppError } from "@/errors/appError";

dotenv.config();

export const initCloudinary = async () => {
  const environmentVariable = await SettingService.findCloudinarySettings();

  if (!environmentVariable?.cloud_config) {
    throw new AppError(400,'Cloudinary configuration not found in database.',"Cloudinary configuration not found in database.");
  }

  cloudinary.config({
    cloud_name: environmentVariable.cloud_config.cloud_name,
    api_key: environmentVariable.cloud_config.api_key,
    api_secret: environmentVariable.cloud_config.api_secret,
  });
};


export const uploadCloudinary = async (localdirpath: string) => {
  try {
    if (!localdirpath) return null;
  
    const response = await cloudinary.uploader.upload(localdirpath, {
      resource_type: "auto",
    });
   console.log("coming response",response)
    fs.unlinkSync(localdirpath); 
    return response;
  } catch (error) {
    if (fs.existsSync(localdirpath)) fs.unlinkSync(localdirpath);
    throw error;
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
      console.warn("⚠️ Could not extract public_id from URL:", imagePath);
      return false;
    }

    console.log("🗑️ Deleting Cloudinary image:", publicId);
    const result = await cloudinary.uploader.destroy(publicId);

    // যদি সফলভাবে delete হয়
    if (result?.result === "ok" || result?.result === "not found") {
      // "not found" মানে image আগেই delete হয়ে গেছে
      return true;
    } else {
      console.error("❌ Cloudinary delete failed:", result);
      return false;
    }

  } catch (error: any) {
    console.error("🔥 Error deleting image:", error?.message);
    return false;
  }
};