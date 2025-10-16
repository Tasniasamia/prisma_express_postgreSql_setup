import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { SettingService } from "@/models/settings/settings.service";

dotenv.config();

export const initCloudinary = async () => {
  const environmentVariable = await SettingService.findCloudinarySettings();

  if (!environmentVariable?.cloud_config) {
    throw new Error("Cloudinary configuration not found in database.");
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
