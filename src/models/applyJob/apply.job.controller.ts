import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { uploadCloudinary } from "@/utils/cloudinary";
import { globalService } from "@/utils/global.service";
import { Request, Response } from "express";
import { includes } from "zod";

export class ApplyJobController {
  static postApplyJobController = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    await globalService.existDocument({
      query: { name: req.body?.name },
      model: "applyJob",
      shouldExist: false,
      isError: true,
      errorMessages: "",
      include: { Job: true },
    });

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let resumeURL: string | undefined;
    let coverLetterURL: string | undefined;

    if (files?.resume?.[0]) {
      const uploadResult = await uploadCloudinary(files.resume[0].path, "pdf");
      resumeURL = uploadResult?.url;
    }

    if (files?.cover_letter?.[0]) {
      const uploadResult = await uploadCloudinary(files.cover_letter[0].path, "pdf");
      coverLetterURL = uploadResult?.url;
    }

    const applyData = {
      ...data,
      resume: resumeURL,
      cover_letter: coverLetterURL,
    };

    const newApply = await globalService.createDocument({
      data: applyData,
      model: "applyJob",
    });

    if (newApply) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Job applied successfully",
      });
    }

    throw new AppError(400, "Something went wrong", "Failed to Apply Job");
  });
  static findApplyJobControllerAdmin = catchAsync(
    async (req: Request, res: Response) => {
      const {
        page = "1",
        limit = "8",
        search = "",
      } = req.query as any;
  
      console.log("search", search);
  
      const OR: any[] = search
        ? [
           {name:{mode:"insensitive",contains:search}},
           {email:{mode:"insensitive",contains:search}}

          ]
        : [];
  
      const where: any = {
        ...(OR.length ? { OR } : {}),
      };
  
      const data = await globalService.getDocuments({
        model: "applyJob",
        filter: where,
        include: { Job: {include:{category:true}} },
        select: {},
        page: parseInt(page),
        limit: parseInt(limit),
      });
  
      res.status(200).json({
        success: true,
        message: "get Job successfully",
        data,
      });
    }
  );
}
