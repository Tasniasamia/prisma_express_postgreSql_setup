import { NextFunction, Request ,Response} from "express"

export const catchAsync=(requestHandler:any)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
      try{
        await requestHandler(req,res,next)
      }
      catch(error){
        await next(error)
      }
    }
}