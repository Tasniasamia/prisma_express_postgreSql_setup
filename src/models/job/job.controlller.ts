import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request,Response } from "express";

export class JobController{
    static postJobController = catchAsync(
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
            model: "Job",
            shouldExist: false,
            isError: true,
            errorMessages: "",
            include: { category: true }
        });
          const createCategory = await globalService.createDocument({
            data: payload,
            model: "Job",
          });
          if (createCategory) {
           return res.status(200).json({
                success: true,
                statusCode:200,
                message: "Job created successfully",
              });
              
          }
          throw new AppError(
            400,
            "something went wrong ",
            "Failed to create Job "
          );
        }
      );

      static findJobControllerPublic = catchAsync(
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
                  [`title.${langCode}`]: {
                    contains: search,
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
            model: "Job",
            filter: where,
            include: {category:true},
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
    
          res.status(200).json({
            success: true,
            message: "Job  fetched successfully",
            data,
          });
        }
      );
      static findJobControllerAdmin = catchAsync(
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
                  [`title.${langCode}`]: {
                    contains: search,
                    mode: "insensitive",
                  },
                }
              ]
            : [];
    
          const where: any = {
            ...(OR.length ? { OR } : {}),
          };
    
          const data = await globalService.getDocuments({
            model: "Job",
            filter: where,
            include: {category:true},
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
    
          res.status(200).json({
            success: true,
            message: "Job  fetched successfully",
            data,
          });
        }
      );

}