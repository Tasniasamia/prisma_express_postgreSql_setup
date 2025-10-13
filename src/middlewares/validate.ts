import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

export const validate=(schema:ZodObject)=>{
   return async(req:Request,res:Response,next:NextFunction)=>{
     try{
       await schema.parseAsync(req?.body);
       next();
     }
     catch(error){
        next(error)
     }
   }
}