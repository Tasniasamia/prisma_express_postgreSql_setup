import { catchAsync } from "@/utils/catchAsync";
import { settingsType } from "./settings.interface";
import { db } from "@/config/db";

export class SettingService {
  static postAndUpdateSettings = async (payload: settingsType) => {
    const findSettings = await db.setting.findFirst();
    if (findSettings) {
    return await db.setting.update({
        where: { id: findSettings?.id },
        data: payload,
      });
    }
    return await db.setting.create({ data: payload });

  };


  static findSettings=async()=>{

    const data = await db.setting.findFirst();
    if(!data){
        return null
    }
    return data;
   }

 
}
