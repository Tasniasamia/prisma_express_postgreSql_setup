import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request,Response } from "express";

export class blogController{
    static postblogController = catchAsync(
        async (req: Request, res: Response) => {
          const payload = await req?.body;
          console.log("payload",payload);
          const { title } = payload;
          const OR: any[] = Object.entries(title).map(([key, value]) => ({
            title: { path: [key], equals: value },
          }));
          const query = { OR };
          const existCategory = await globalService.existDocument({
            query: query,
            model: "blog",
            shouldExist: false,
            isError: true,
            errorMessages: "",
            include: { category: true }
        });
          const createCategory = await globalService.createDocument({
            data: payload,
            model: "blog",
          });
          if (createCategory) {
           return res.status(200).json({
                success: true,
                statusCode:200,
                message: "blog created successfully",
              });
              
          }
          throw new AppError(
            400,
            "something went wrong ",
            "Failed to create blog "
          );
        }
      );

    

      static findblogControllerPublic = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
            langCode = "en",
          } = req.query as any;
      
          console.log("search", search);
      
          const OR: any[] = search
            ? [
                {
                  title: {
                    path: [langCode],
                    string_contains: search,
                    mode: "insensitive",
                  },
                }
              ]
            : [];
      
          const where: any = {
            status: true,
            ...(OR.length ? { OR } : {}),
          };
      
          const data = await globalService.getDocuments({
            model: "blog",
            filter: where,
            include: { category: true ,comment:true },
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
      
          res.status(200).json({
            success: true,
            message: "blogs fetched successfully",
            data,
          });
        }
      );
      
      static findblogControllerAdmin = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
            langCode = "en",
          } = req.query as any;
      
          console.log("search", search);
      
          const OR: any[] = search
            ? [
                {
                  title: {
                    path: [langCode],
                    string_contains: search,
                    mode: "insensitive",
                  },
                }
              ]
            : [];
      
          const where: any = {
            ...(OR.length ? { OR } : {}),
          };
      
          const data = await globalService.getDocuments({
            model:"blog",
            filter: where,
            include: { category: true , comment: true },
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
      
          res.status(200).json({
            success: true,
            message: "blogs fetched successfully",
            data,
          });
        }
      );
      static updateblogController = catchAsync(
        async (req: Request, res: Response) => {
          const payload = await req?.body;
          const { title } = payload;
          const OR: any[] = Object.entries(title).map(([key, value]) => ({
            title: { path: [key], equals: value },
          }));
          const query = { OR };
          const existCategory = await globalService.existDocument({
            query: query,
            model: "blog",
            shouldExist: true,
            isError: false,
            errorMessages: "",
            include: { category: true }
          });
          const updateCategory = await globalService.updateDocument({
            id: payload?.id,
            data: payload,
            model: "blog",
          });
          if (updateCategory) {
            return res
              .status(200)
              .json({
                success: true,
                statusCode: 200,
                message: "blog updated successfully",
              });
          }
          throw new AppError(
            400,
            "something went wrong ",
            "Failed to update blog "
          );
        }
      );
      static deleteblogController = catchAsync(async (req: Request, res: Response) => {
        const query: string | any = req?.query?.id;
        const deleteblog= await globalService.deleteDocument({
          id: query,
          model: "blog",
        });
        if (deleteblog) {
          return res.status(200).json({
            success: true,
            message: "blog deleted successfully",
            deleteblog,
          });
        }
        throw new AppError(
          400,
          "Something went wrong",
          "Failed to delete blog"
        );
      });
}