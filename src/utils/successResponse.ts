import { TSuccessResponse } from "@/interface/success"

export const successResponse=(message:string,data:{}|[]|null):TSuccessResponse=>{
    let success=true
    let statusCode=200
    
    return {
        success,
        statusCode,
        message,
        data
    }



}