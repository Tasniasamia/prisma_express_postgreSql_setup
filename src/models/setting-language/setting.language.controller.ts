import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request, Response } from "express";
import { success } from "zod";
import { SettingLanguageService } from "./setting.language.service";

export class SettingLanguageController {
  static postLanguage = catchAsync(async (req: Request, res: Response) => {
    console.log("req?.body",req?.body);
    const { name,flag, code, rtl, translations, active } = await req.body;
    const language = await SettingLanguageService.findLanguageByName(name,false);
    if(language){
        throw new AppError(400, "Something went wrong", "language already exist");

    }
    if (req.body?.default) {
        await SettingLanguageService.updateManyLanguage({}, { default: false });
      }
      const data = await globalService.createDocument( {data:req?.body,model:'language'});
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Language created successfully",
        data: data,
      });
  });

  static updateLanage = catchAsync(async (req: Request, res: Response) => {
    const {id, name, code, rtl, translations, active } = await req.body;
    console.log("req?.body update",await req?.body)
    const language = await SettingLanguageService.findLanguageById(id);
    if (req.body?.default) {
      await SettingLanguageService.updateManyLanguage({}, { default: false });
    }
    const updateLanguage = await globalService.updateDocument({
      id:id,
      data:await req.body,
      model:'language',
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
          : "id name code flag default active translations";

      const filter = { active: true };

      if (query?._id) {
        data = await SettingLanguageService.findLanguageById(query?.id);
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
          : "id name code flag default active translations";
      const filter = {};
      if (query?._id) {
        data = await SettingLanguageService.findLanguageById(query?.id);
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
    const id=req?.query?.id as string
    console.log("delete id ",id);
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
