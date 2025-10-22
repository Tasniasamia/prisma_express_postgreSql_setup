import { NextFunction, Request, Response } from "express";
import { catchAsync } from "./catchAsync";
import { AppError } from "@/errors/appError";
import { deleteImage } from "./cloudinary";
import { db } from "@/config/db";
import { successResponse } from "./successResponse";
import { createDocumentOptions, existDocumentOptions } from "./global.interface";

export  class globalService {
 
    static createDocument=async<T,D>({data,model}:createDocumentOptions<T,D>): Promise<T>=>{
        const createdDoc =await  (db as any)[model].create(data);
        const findDoc=await (db as any)[model].findUnique({where:{id:createdDoc?.id}})
        return findDoc;
    }
    static existDocument=async<T>({query,select,model,shouldExist=false,isError,errorMessages,include}:existDocumentOptions):Promise<T>=>{
     const findDoc=await (db as any)[model].findFirst({where:query},select,include);
     if(findDoc && !shouldExist && isError ){
      throw new AppError(400,'Something went wrong',`${model} already exist`);
     }
     if(!findDoc && shouldExist && isError ){
        throw new AppError(
            400,
            "Request Failed!",
           `${model} not found`
          );     
          }
          return findDoc;
    }

    
}
