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
    if(data?.role ==="USER"){
        return true
    }
    return false
}