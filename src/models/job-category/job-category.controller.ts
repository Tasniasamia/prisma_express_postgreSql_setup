import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { JobCategoryService } from "./job-category.service";
import { AppError } from "@/errors/appError";
import { success } from "zod";

export class JobCategoryController{
    static postJobCategoryController=catchAsync(async(req:Request,res:Response)=>{
        const payload=await req?.body;
        const data=await JobCategoryService.createJobCategory(payload);
        return res.status(200).json({success:true,statusCode:200,message:"Job Category created successfully"})
    })
}