import { NextFunction, Request, Response } from 'express';
import { ZodAny } from 'zod';

export const validate=(schema:ZodAny)=>{
   return async(req:Request,res:Response,next:NextFunction)=>{
     try{
       await schema.parseAsync({body:req?.body,cookies:req?.cookies});
       next();
     }
     catch(error){
        next(error)
     }
   }
}