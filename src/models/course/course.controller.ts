import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { AppError } from "@/errors/appError";
import { globalService } from "@/utils/global.service";

export class CourseController {
  static postCourseController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCourse = await globalService.existDocument({
        query: query,
        model: "Course",
        shouldExist: false,
        isError: true,
        errorMessages: "",
        include: true,
      });
      const createCourse = await globalService.createDocument({
        data: payload,
        model: "Course",
      });
      if (createCourse) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Course created successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to create Course"
      );
    }
  );

  static updateCourseController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCourse = await globalService.existDocument({
        query: query,
        model: "Course",
        shouldExist: true,
        isError: false,
        errorMessages: "",
        include: {category:true},
      });
      const updateCourse = await globalService.updateDocument({
        id: payload?.id,
        data: payload,
        model: "Course",
      });
      if (updateCourse) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Course updated successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to update Course"
      );
    }
  );

  static findCourseControllerPublic = catchAsync(
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
        model: "Course",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        data,
      });
    }
  );

  static findCourseController = catchAsync(
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
        model: "Course",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        data,
      });
    }
  );

  static deleteCourseController = catchAsync(async (req: Request, res: Response) => {
    const query: string | any = req?.query?.id;
    const deleteCourseCategory = await globalService.deleteDocument({
      id: query,
      model: "Course",
    });
    if (deleteCourseCategory) {
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        deleteCourseCategory,
      });
    }
    throw new AppError(
      400,
      "Something went wrong",
      "Failed to delete Course"
    );
  });
}
