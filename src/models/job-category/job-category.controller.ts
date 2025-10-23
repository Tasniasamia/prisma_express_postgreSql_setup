import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { JobCategoryService } from "./job-category.service";
import { AppError } from "@/errors/appError";
import { success } from "zod";
import { globalService } from "@/utils/global.service";

export class JobCategoryController {
  static postJobCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "JobCategory",
        shouldExist: false,
        isError: true,
        errorMessages: "",
        include: true,
      });
      const createCategory = await globalService.createDocument({
        data: payload,
        model: "JobCategory",
      });
      if (createCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Job Category created successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to create Job Category"
      );
    }
  );

  static updateJobCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "JobCategory",
        shouldExist: true,
        isError: false,
        errorMessages: "",
        include: true,
      });
      const updateCategory = await globalService.updateDocument({
        id: payload?.id,
        data: payload,
        model: "JobCategory",
      });
      if (updateCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "Job Category updated successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to update Job Category"
      );
    }
  );

  static findJobCategoryControllerPublic = catchAsync(
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
        model: "JobCategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Job categories fetched successfully",
        data,
      });
    }
  );

  static findJobCategoryController = catchAsync(
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
        model: "JobCategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "Job categories fetched successfully",
        data,
      });
    }
  );

  static deleteController = catchAsync(async (req: Request, res: Response) => {
    const query: string | any = req?.query?.id;
    const deleteJobCategory = await globalService.deleteDocument({
      id: query,
      model: "JobCategory",
    });
    if (deleteJobCategory) {
      return res.status(200).json({
        success: true,
        message: "Job category deleted successfully",
        deleteJobCategory,
      });
    }
    throw new AppError(
      400,
      "Something went wrong",
      "Failed to delete Job category"
    );
  });
}
