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

    fs.unlinkSync(localdirpath); 
    return response;
  } catch (error) {
    if (fs.existsSync(localdirpath)) fs.unlinkSync(localdirpath);
    throw error;
  }
};




export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const isCloudinaryImage = imagePath.includes("res.cloudinary.com");

    if (isCloudinaryImage) {
      const match = imagePath.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-z]+$/i);
      const publicId = match ? match[1] : null;

      if (publicId) {
        console.log("🗑️ Deleting Cloudinary image:", publicId);
        await cloudinary.uploader.destroy(publicId);
      } else {
        throw new AppError(400,' Could not extract public_id from',' Could not extract public_id from')

      }
    } 

  } catch (error:any) {
    throw new AppError(400,'Error deleting image',error?.message)
  }
};
