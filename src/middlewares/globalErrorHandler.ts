
import { ErrorRequestHandler, NextFunction, Response, Request } from 'express';
import {  ZodError } from 'zod';
import { handleZodError } from '@/errors/handleZodError';
import { Prisma } from '@/generated/prisma';
import handlePrismaError from '@/errors/handlePrismaError';
import { AppError } from '@/errors/appError';
import httpStatus from 'http-status';
import config from '@/config';

const globalErrorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
): any => {
    let statusCode: number = 500;
    let message: string = 'Something went wrong';
    let errorMessage : string = 'Server Side error';
    let errorDetails: unknown = null;
    let success:boolean;
    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
         success= simplifiedError?.success;

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage as string;
        errorDetails = simplifiedError?.errorDetails;
    }  else if (typeof error?.code === 'string' && error.code.startsWith('P')) {
        const simplifiedError = handlePrismaError(error);
        ({ success, statusCode, message, errorMessage='Unhandled Prisma Error Occurred', errorDetails } = simplifiedError);
      }
     else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessage = error?.errorMessage;
        errorDetails = error;
    } else if (error?.name === 'TokenExpiredError') {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: 401,
            message: 'Unauthorized Access',
            errorMessage:
                'You do not have the necessary permissions to access this resource.',
            errorDetails: null,
            stack: null,
        });
    } else if (error instanceof Error) {
        errorMessage = error?.message || 'Internal server error';
        errorDetails = error;
    }
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessage,
        errorDetails,
        stack: config.node_env === 'development' ? error?.stack : null,
    });
};

export default globalErrorHandler;
