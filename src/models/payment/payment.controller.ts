import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";

export class PaymentController{
    static postPaymentController=catchAsync(async(req:Request,res:Response)=>{
     const {amount,status,payment_method,currency_code,course_id,user_id}=await req?.body;
     
    })
    // app.post('/payment',async(req,res)=>{
    //     const moie=await molieController();
    //     return res.status(200).json(moie)
    //   })
}