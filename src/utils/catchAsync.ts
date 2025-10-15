import { NextFunction, Request ,Response} from "express"

export const catchAsync=(requestHandler:any)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
      try{
        requestHandler(req,res,next)
      }
      catch(error){
        next(error)
      }
    }
}