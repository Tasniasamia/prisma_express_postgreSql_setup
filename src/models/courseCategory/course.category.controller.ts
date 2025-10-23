import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { AppError } from "@/errors/appError";
import { globalService } from "@/utils/global.service";

export class CourseCategoryController {
  static postCourseCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "Coursecategory",
        shouldExist: false,
        isError: true,
        errorMessages: "",
        include: true,
      });
      const createCategory = await globalService.createDocument({
        data: payload,
        model: "Coursecategory",
      });
      if (createCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Course Category created successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to create Course Category"
      );
    }
  );

  static updateCourseCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "Coursecategory",
        shouldExist: true,
        isError: false,
        errorMessages: "",
        include: true,
      });
      const updateCategory = await globalService.updateDocument({
        id: payload?.id,
        data: payload,
        model: "Coursecategory",
      });
      if (updateCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Course Category updated successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to update Course Category"
      );
    }
  );

  static findCourseCategoryControllerPublic = catchAsync(
    async (req: Request, res: Response) => {
      const {
        page = "1",
        limit = "8",
        search = "",
        langCode = "en",
      } = req.query as any;
      const OR: any[] = search
        ? [
            {
              [`name.${langCode}`]: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              [`description.${langCode}`]: {
                contains: search,
                mode: "insensitive",
              },
            },
          ]
        : [];

      const where: any = {
        status: true,
        ...(OR.length ? { OR } : {}),
      };

      const data = await globalService.getDocuments({
        model: "Coursecategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Course categories fetched successfully",
        data,
      });
    }
  );

  static findCourseCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const {
        page = "1",
        limit = "8",
        search = "",
        langCode = "en",
      } = req.query as any;
      const OR: any[] = search
        ? [
            {
              [`name.${langCode}`]: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              [`description.${langCode}`]: {
                contains: search,
                mode: "insensitive",
              },
            },
          ]
        : [];

      const where: any = {
        ...(OR.length ? { OR } : {}),
      };

      const data = await globalService.getDocuments({
        model: "Coursecategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Course categories fetched successfully",
        data,
      });
    }
  );

  static deleteCourseCategoryController = catchAsync(async (req: Request, res: Response) => {
    const query: string | any = req?.query?.id;
    const deleteCourseCategory = await globalService.deleteDocument({
      id: query,
      model: "Coursecategory",
    });
    if (deleteCourseCategory) {
      return res.status(200).json({
        success: true,
        message: "Course category deleted successfully",
        deleteCourseCategory,
      });
    }
    throw new AppError(
      400,
      "Something went wrong",
      "Failed to delete Course category"
    );
  });
}
