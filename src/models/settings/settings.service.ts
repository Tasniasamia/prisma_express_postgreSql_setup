import { catchAsync } from "@/utils/catchAsync";
import { settingsType } from "./settings.interface";
import { db } from "@/config/db";

export class SettingService {
  static findSettings = async () => {
    const data = await db.setting.findFirst({include:{email_config:true,cloud_config:true}});
    if (!data) {
      return null;
    }
    return data;
  };

  static postAndUpdateSettings = async (payload: settingsType) => {
    const settingsData = await this.findSettings();
    const { email_config, cloud_config, ...rest } = payload;
    const emailData = email_config?.resend
      ? {
          resend_api_key: email_config.resend.api_key,
          resend_email: email_config.resend.email,
        }
      : undefined;

    const cloudData = cloud_config?.cloudinary
      ? {
          cloud_name: cloud_config.cloudinary.cloud_name,
          api_key: cloud_config.cloudinary.api_key,
          api_secret: cloud_config.cloudinary.api_secret,
        }
      : undefined;

    if (settingsData) {
      return await db.setting.update({
        where: { id: settingsData.id },
        data: {
          ...rest,
          ...(emailData && {
            email_config: {
              upsert: {
                update: emailData,
                create: emailData,
              },
            },
          }),
          ...(cloudData && {
            cloud_config: {
              upsert: {
                update: cloudData,
                create: cloudData,
              },
            },
          }),
        },
        include: {
          email_config: true,
          cloud_config: true,
        },
      });
    }

    return await db.setting.create({
      data: {
        ...rest,
        ...(emailData && {
          email_config: {
            create: emailData,
          },
        }),
        ...(cloudData && {
          cloud_config: {
            create: cloudData,
          },
        }),
      },
      include: {
        email_config: true,
        cloud_config: true,
      },
    });
  };
}
