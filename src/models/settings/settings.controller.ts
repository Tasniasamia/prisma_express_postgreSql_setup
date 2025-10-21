import { catchAsync } from "@/utils/catchAsync";
import { Response, Request } from "express";
import { SettingService } from "./settings.service";
import { successResponse } from "@/utils/successResponse";

export class settingController {
  static postSettingController = catchAsync(
    async (req: Request, res: Response) => {
      
      await SettingService.postAndUpdateSettings(req?.body);
      const { success, statusCode, message, data } = await successResponse(
        req?.body?.id?"Settings Updated Succcessfully":"Settings created Successfully",
        {}
      );
      return await res
      .status(statusCode)
      .json({ success, statusCode, message, data });
    }
  );

  static getSettingsController = catchAsync(
    async (req: Request, res: Response) => {
      const getSettings = await SettingService.findSettings();
      if (!getSettings) {
        return res.status(400).json({
          success: false,
          statusCode: 404,
          message: "Settings Not Found",
          errorMessage:
            "You do not have the necessary permissions to access this resource.",
          errorDetails: null,
          stack: null,
        });
      }
      const { success, statusCode, message, data } = await successResponse(
        "Settings Get Successfully",
        getSettings
      );
      return res
        .status(statusCode)
        .json({ success, statusCode, message, data });
    }
  );
}
