import { TErrorSource, TGenericErrorResponse } from "@/interface/error";
import { ZodError, ZodIssue } from "zod";

 export const handleZodError=(error:ZodError):TGenericErrorResponse=>{
    
let statusCode=422;
let errorSources=error?.issues?.map((issues:ZodIssue)=>{
    return ({
        path:issues?.path,
        message:issues?.message
    })
   
})
let allErrorMessages:string="";
errorSources?.map((i,index)=>{
    allErrorMessages+=i?.message + (errorSources?.length-1 === index) ?'.':'.'
})
    
return {
 success:false,
 statusCode,
 message:'Validation Error',
 errorMessage:allErrorMessages,
 errorDetails:error

}
 
}