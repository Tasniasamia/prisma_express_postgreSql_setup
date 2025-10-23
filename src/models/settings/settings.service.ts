import { catchAsync } from "@/utils/catchAsync";
import { settingsType } from "./settings.interface";
import { db } from "@/config/db";

export class SettingService {
  static findSettings = async () => {
    const data = await db.setting.findFirst();
    if (!data) {
      return null;
    }
    return data;
  };

  static findResendEmailSettings=async()=>{
    const data = await db.setting.findFirst({select:{email_config:true}});
    if (!data) {
      return null;
    }
    return data;
  }

  static postAndUpdateSettings = async (payload: settingsType) => {
    if ('decoded' in payload) delete payload.decoded;

    const settingsData = await this.findSettings();




    if (settingsData) {
      return await db.setting.update({
        where: { id: settingsData.id },
        data: payload
        
      });
    }

    return await db.setting.create({
     data:payload
    });
  };


}
