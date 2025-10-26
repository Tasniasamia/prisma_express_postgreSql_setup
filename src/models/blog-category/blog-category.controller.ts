import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { AppError } from "@/errors/appError";
import { globalService } from "@/utils/global.service";

export class blogCategoryController {
  static postBlogCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "blogCategory",
        shouldExist: false,
        isError: true,
        errorMessages: "",
        include: true,
      });
      const createCategory = await globalService.createDocument({
        data: payload,
        model: "blogCategory",
      });
      if (createCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "blog Category created successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to create blog Category"
      );
    }
  );

  static updateblogCategoryController = catchAsync(
    async (req: Request, res: Response) => {
      const payload = await req?.body;
      const { name } = payload;
      const OR: any[] = Object.entries(name).map(([key, value]) => ({
        name: { path: [key], equals: value },
      }));
      const query = { OR };
      const existCategory = await globalService.existDocument({
        query: query,
        model: "blogCategory",
        shouldExist: true,
        isError: false,
        errorMessages: "",
        include: true,
      });
      const updateCategory = await globalService.updateDocument({
        id: payload?.id,
        data: payload,
        model: "blogCategory",
      });
      if (updateCategory) {
        return res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "blog Category updated successfully",
          });
      }
      throw new AppError(
        400,
        "something went wrong ",
        "Failed to update blog Category"
      );
    }
  );

  static findblogCategoryControllerPublic = catchAsync(
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
        model: "blogCategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "blog categories fetched successfully",
        data,
      });
    }
  );

  static findblogCategoryController = catchAsync(
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
        model: "blogCategory",
        filter: where,
        include: {},
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        message: "blog categories fetched successfully",
        data,
      });
    }
  );

  static deleteController = catchAsync(async (req: Request, res: Response) => {
    const query: string | any = req?.query?.id;
    const deleteblogCategory = await globalService.deleteDocument({
      id: query,
      model: "blogCategory",
    });
    if (deleteblogCategory) {
      return res.status(200).json({
        success: true,
        message: "blog category deleted successfully",
        deleteblogCategory,
      });
    }
    throw new AppError(
      400,
      "Something went wrong",
      "Failed to delete blog category"
    );
  });
}
