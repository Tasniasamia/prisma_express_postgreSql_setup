import { Request,Response } from "express";
import httpStatus from 'http-status';

export const notFoundHandler=(req:Request,res:Response):void=>{

    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        statusCode:httpStatus.NOT_FOUND,
        message:"API NOT FOUND",
        errorMessage:null,
        errorDetails:null

    })

}