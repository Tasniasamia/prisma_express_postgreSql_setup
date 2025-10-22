import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request, Response } from "express";
import { success } from "zod";
import { SettingLanguageService } from "./setting.language.service";

export class SettingLanguageController {
  static postLanguage = catchAsync(async (req: Request, res: Response) => {
    const { name, code, rtl, translations, active } = await req.body;
    const language = await SettingLanguageService.findLanguageByName(name);
    if (language) {
      throw new AppError(400, "Something went wrong", "Language already exist");
    }
    if (req.body?.default) {
      await SettingLanguageService.updateManyLanguage({}, { default: false });
    }
    const data = await globalService.createDocument(req?.body);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Language created successfully",
      data: data,
    });
  });

  static updateLanage = catchAsync(async (req: Request, res: Response) => {
    const { name, code, rtl, translations, active } = await req.body;
    const language = await SettingLanguageService.findLanguageByName(name);
    if (req.body?.default) {
      await SettingLanguageService.updateManyLanguage({}, { default: false });
    }
    const updateLanguage = await globalService.updateDocument({
      id: req.body.id,
      data: req.body,
      model: "language",
    });
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Language updated successfully",
      data: updateLanguage,
    });
  });

  static getLanguagesByPublic = catchAsync(
    async (req: Request, res: Response) => {
      const { query }: any = req;
      const { fields } = query;

      let data: any = null;
      const localFields =
        typeof fields === "string"
          ? fields.split(",").join(" ")
          : "name code flag default translations";

      const filter = { active: true };

      if (query?._id) {
        data = await SettingLanguageService.findLanguageById(query?._id);
      } else {
        data = await SettingLanguageService.findLanguageListByQuery(
          filter,
          localFields
        );
      }

      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: `Get Language ${query?._id ? "" : "list"} successfully`,
        data,
      });
    }
  );

  static getLanguagesByAdmin = catchAsync(
    async (req: Request, res: Response) => {
      const { query }: any = req;
      const { fields } = query;
      let data: any = null;
      const localFields =
        typeof fields === "string"
          ? fields.split(",").join(" ")
          : "-updatedAt -__v";
      const filter = {};
      if (query?._id) {
        data = await SettingLanguageService.findLanguageById(query?._id);
      } else {
        data = await SettingLanguageService.findLanguageListByQuery(
          filter,
          localFields
        );
      }
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: `Get Language ${query?._id ? "" : "list"} successfully`,
        data,
      });
    }
  );
  static deleteLanguageSetting=catchAsync(async(req:Request,res:Response)=>{
    const {id}=await req?.body;
    const data=await globalService.deleteDocument({id:id,model:'language'});
    if(data){
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: `Language deleted successfully`,
            data,
          });
    }
  })
}
