import { db } from "@/config/db";
import { AppError } from "@/errors/appError"

export const findPaidCourseByUser=async(user_id:string,course_id:string)=>{
if(!user_id || !course_id){
    throw new AppError(400,'Something Went Wrong','All field are required to find payment status');
    }
    const data=await db.payment.findFirst({where:{user_id:user_id,course_id:course_id,status:'paid'}});
    if(data){
        return true;
    }
    return false;
}

export const findRoleUser=async(id:string)=>{
    if(!id){
        throw new AppError(400,'Something Went Wrong','Id field is required to find user');
    }
    const data=await db.user.findUnique({where:{id:id}});
    console.log("role",data);
    if(data?.role ==="USER"){
        return true
    }
    return false
}

export const findCourseByInfo=async(id:string,amount:number|any,currency_code:string|any)=>{
    if(!id || !amount || !currency_code){
        throw new AppError(400,'Something Went Wrong','All field are required to find course details');
 
    }
    const data=await db.course.findFirst({where:{id:id,price:amount,currency_code:currency_code}});
    if(data?.sit === 0){
        throw new AppError(400,'Something went wrong','No Seat available for course')
    }
    if(data){
        return true;
    }
    return false
}