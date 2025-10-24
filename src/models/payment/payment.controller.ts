import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { findPaidCourseByUser, findRoleUser } from "./payment.service";
import { AppError } from "@/errors/appError";
import { molieController } from "@/utils/molie";

export class PaymentController{
    static postPaymentController=catchAsync(async(req:Request,res:Response)=>{
     const {amount,status,payment_method,currency_code,course_id,user_id}=await req?.body;
      const isAlreadyEnrolled=await findPaidCourseByUser(user_id,course_id);
      const findUser=await findRoleUser(user_id);
      if(!findUser){
        throw new AppError(400,'Something went wrong',"Only User can access here")

      }
      if(isAlreadyEnrolled){
        throw new AppError(400,'Something went wrong',"Yon have already paid for enroll course")
      }
      if(payment_method === "molie"){
        const data=await molieController(currency_code,amount);
        console.log(data);
      }

    })
    // app.post('/payment',async(req,res)=>{
    //     const moie=await molieController();
    //     return res.status(200).json(moie)
    //   })
}