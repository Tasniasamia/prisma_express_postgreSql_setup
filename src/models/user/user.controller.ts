import { catchAsync } from "@/utils/catchAsync";
import { Response,Request} from "express";

export class userController{
    static  registrationController=catchAsync(async(req:Request,res:Response)=>{
      return await  res.status(200).send("Hello")
    })
}