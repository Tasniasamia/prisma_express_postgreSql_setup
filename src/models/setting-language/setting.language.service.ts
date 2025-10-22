import { db } from "@/config/db";
import { AppError } from "@/errors/appError";

export class SettingLanguageService {
  static findLanguageByName = async (name: string) => {
    let language = await db.language.findFirst({ where: { name: name } });
    if (!language) {
      throw new AppError(400, "Something went wrong", "language doesn't exist");
    }
    return language;
  };
  static findLanguageById = async (id: string) => {
    let language = await db.language.findUnique({ where: { id: id } });
    if (!language) {
      throw new AppError(400, "Something went wrong", "language doesn't exist");
    }
    return language;
  };
  static updateLanguage = async (query: any, data: any) => {
    let language = await db.language.findFirst({ where: query });
    if (language) {
      let language = await db.language.update({ where: query, data: data });
      return language;
    }
   throw new AppError(400, "Something went wrong", "Language update failed");
  }
  static updateManyLanguage = async (query: any, data: any) => {
    let language = await db.language.findMany({ where: query });
    if (language.length>0) {
      let language = await db.language.updateMany({ where: query, data: data });
      return language;
    }
   throw new AppError(400, "Something went wrong", "All language update failed");
  }
  static async findLanguageListByQuery(
    filter: Record<string, any>,
    fields: string,
  ) {
    // fields কে object বানাও
    const selectFields =
      typeof fields === "string"
        ? fields.split(" ").reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {} as Record<string, boolean>)
        : undefined;
  
    // Prisma query
    const languages = await db.language.findMany({
      where: filter,
      select: selectFields,
    });
  
    if (!languages?.length) {
      throw new AppError(404, "Request Failed", "Language not found!");
    }
  
    return languages;
  }
  


}
