import { catchAsync } from "@/utils/catchAsync";
import { query, Request,Response } from "express";
import { JobCategoryService } from "./category.service";
import { successResponse } from "@/utils/successResponse";

export class JobCategoryController{
    static addJobCategoryController=catchAsync(async(req:Request,res:Response)=>{
      
      const response=await JobCategoryService.createJobCategory(req?.body);
      const { success, statusCode, message, data } = await successResponse(
        "Job Category created Successfully",
        response
      );
      return await res
      .status(statusCode)
      .json({ success, statusCode, message, response });
    })
    static editJobCategoryController=catchAsync(async(req:Request,res:Response)=>{
      
        const response=await JobCategoryService.updateJobCategory(req?.body);
        const { success, statusCode, message, data } = await successResponse(
          "Job Category Updated Successfully",
          response
        );
        return await res
        .status(statusCode)
        .json({ success, statusCode, message, response });
      })
      static deleteJobCategoryController=catchAsync(async(req:Request,res:Response)=>{
      
        const {id}= req?.params;
        const response=await JobCategoryService.deleteJobCategory(id);
        const { success, statusCode, message, data } =  successResponse(
          "Job Category deleted Successfully",
          response
        );
        return  res
        .status(statusCode)
        .json({ success, statusCode, message, response });
      })
      static getAllJobCategory=catchAsync(async(req:Request,res:Response)=>{
        const query=req?.query ;
        const data=await JobCategoryService.getAllJobCategory(query);
        res.status(200).json({
            success: true,
            message: "All Job Category fetched successfully",
            data: data,
          });
        
      })
}