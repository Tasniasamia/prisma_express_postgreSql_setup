import { db } from "@/config/db";
import { AppError } from "@/errors/appError";
import { Request,Response } from "express";
import { boolean } from "zod";

export class JobCategoryService{
   static createJobCategory=async(payload:any)=>{
    if ('decoded' in payload) delete payload.decoded;

    const {name,...others}=payload;
    const findJobCategory=await db.jobCategory.findFirst({where:{name:name}});
    if(findJobCategory){
        throw new AppError(400,"Already Exist","Category already exist . Please add new category")
    }
    const data=await db.jobCategory.create({data:payload});
    return data;
   }

   static updateJobCategory=async(payload:any)=>{
    if ('decoded' in payload) delete payload.decoded;

    const {id,...others}=payload;
    if(!id){
        throw new AppError(400,"Something went wrong","Category doesn't exist . Please add new category")
    }
    const data=await db.jobCategory.update({where:{id:id},data:payload});
    return data;
   }

   static deleteJobCategory=async(id:string)=>{
    if(!id){
        throw new AppError(400,"Something went wrong","Id is Required");
    }
    const findJobCategory=await db.jobCategory.findUnique({where:{id:id}});
    if(!findJobCategory){
      throw new AppError(400,"Something went wrong","Job Category doesn't exist");
    }
    const deleteJobCategory=await db.jobCategory.delete({where:{id:id}});
    return deleteJobCategory;
   }

   static getAllJobCategory = async (query?:  any) => {
    let conditions = {};
  
    if (query) {
      const isBooleanQuery =
        query?.status?.toLowerCase() === "true" || query?.status?.toLowerCase() === "false";
  
      conditions = isBooleanQuery
        ? {
            status: query?.status?.toLowerCase() === "true",
          }
        : {
            OR: [
              { name: { contains: query?.name, mode: "insensitive" } },
            ],
          };
    }
    let limit = parseInt(query?.limit);
    let page = parseInt(query?.page);
    const search=query?.search as string;
    if (limit || page) {
      const [docs, totalDocs] = await Promise.all([
        db.jobCategory.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where:conditions
        }),
        db.jobCategory.count(),
      ]);
      const totalPages = Math.ceil(totalDocs / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
       const data2={ 
         docs,
          totalDocs: totalDocs,
          limit: limit,
          currentPage: page,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          totalPages:totalPages,
          prevPage:page>1?currentPage-1:null,
          nextPage:page<totalPages?currentPage+1:null

        }
    return data2;}
    const allCategory = await db.jobCategory.findMany({});
    return allCategory;











    // let conditions = {};
  
    // if (query) {
    //   const isBooleanQuery =
    //     query.toLowerCase() === "true" || query.toLowerCase() === "false";
  
    //   conditions = isBooleanQuery
    //     ? {
    //         status: query.toLowerCase() === "true",
    //       }
    //     : {
    //         OR: [
    //           { name: { contains: query, mode: "insensitive" } },
    //           { description: { contains: query, mode: "insensitive" } },
    //         ],
    //       };
    // }
  
    // const data = await db.jobCategory.findMany({
    //   where: conditions,
    //   orderBy: {
    //     createdAt: "desc", 
    //   },
    // });
  
  
  };
  
}


