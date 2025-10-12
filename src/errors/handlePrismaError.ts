// utils/handlePrismaError.ts
import { Prisma } from '@/generated/prisma';
import { TGenericErrorResponse } from '../interface/error';

const handlePrismaError = (error: unknown): TGenericErrorResponse => {
  const statusCodeDefault = 400;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Duplicate error
        return {
          success:false,
          statusCode: statusCodeDefault,
          message: 'Duplicate Error',
          errorMessage: `Unique field already exists: ${error.meta?.target}`,
          errorDetails: error,
        };
      case 'P2005': // Cast error / invalid type
        return {
           success:false,
          statusCode: statusCodeDefault,
          message: 'Invalid Field Type',
          errorMessage: `Invalid value type for field: ${error.meta?.field_name}`,
          errorDetails: error,
        };
      case 'P2009':
      case 'P2011': // Database validation error
        return {
          success:false,
          statusCode: statusCodeDefault,
          message: 'Validation Error',
          errorMessage: `Database validation failed: ${error.message}`,
          errorDetails: error,
        };
      case 'P2025': // Record not found
        return {
          success:false,
          statusCode: 404,
          message: 'Record Not Found',
          errorMessage: 'No record found for the given query.',
          errorDetails: error,
        };
      default: // unknown PrismaClientKnownRequestError
        return {
          success:false,
          statusCode: 500,
          message: 'Database Error',
          errorMessage: 'Something went wrong with the database.',
          errorDetails: error,
        };
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      success:false,
      statusCode: statusCodeDefault,
      message: 'Validation Error',
      errorMessage: error.message,
      errorDetails: error,
    };
  }

  return {
    success:false,
    statusCode: 500,
    message: 'Unknown Error',
    errorMessage: (error as Error)?.message || 'Unexpected error',
    errorDetails: error,
  };
};

export default handlePrismaError;
