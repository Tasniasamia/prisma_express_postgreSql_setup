import { Prisma } from '@/generated/prisma/client';
import { TGenericErrorResponse } from '../interface/error';

const handlePrismaError = (error: unknown): TGenericErrorResponse => {
  const statusCodeDefault = 400;

  // 1️⃣ PrismaClientKnownRequestError → (Known database errors)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Duplicate field (unique constraint)
        return {
          success: false,
          statusCode: statusCodeDefault,
          message: 'Duplicate Error',
          errorMessage: `Unique field already exists: ${error?.meta?.target}`,
          errorDetails: error,
        };

      case 'P2003': // Foreign key constraint failed
        return {
          success: false,
          statusCode: 400,
          message: 'Foreign Key Constraint Failed',
          errorMessage: `Invalid relation field: ${error?.meta?.field_name}`,
          errorDetails: error,
        };

      case 'P2005': // Invalid field value type
        return {
          success: false,
          statusCode: statusCodeDefault,
          message: 'Invalid Field Type',
          errorMessage: `Invalid value type for field: ${error?.meta?.field_name}`,
          errorDetails: error,
        };

      case 'P2009':
      case 'P2011':
        return {
          success: false,
          statusCode: statusCodeDefault,
          message: 'Database Validation Error',
          errorMessage: error?.message || '',
          errorDetails: error,
        };

      case 'P2021':
        return {
          success: false,
          statusCode: 500,
          message: 'Database Schema Error',
          errorMessage: `Table or column not found in database.`,
          errorDetails: error,
        };
      case 'P2022':
        return {
          success: false,
          statusCode: 500,
          message: 'Database Schema Error',
          errorMessage: `Table or column not found in database.`,
          errorDetails: error,
        };

      case 'P2025': // Record not found
        return {
          success: false,
          statusCode: 404,
          message: 'Record Not Found',
          errorMessage: 'No record found for the given query.',
          errorDetails: error,
        };

      case 'P2034': // Deadlock or write conflict
        return {
          success: false,
          statusCode: 409,
          message: 'Transaction Conflict',
          errorMessage: 'Write conflict or deadlock occurred. Please retry.',
          errorDetails: error,
        };

      default:
        return {
          success: false,
          statusCode: 500,
          message: `Prisma Database Error (${error.code})`,
          errorMessage: error.message || '',
          errorDetails: error,
        };
    }
  }

  // 2️⃣ PrismaClientUnknownRequestError → (Error without a known code)
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      success: false,
      statusCode: 500,
      message: 'Unknown Request Error',
      errorMessage: error.message || '',
      errorDetails: error,
    };
  }

  // 3️⃣ PrismaClientRustPanicError → (Engine crashed)
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      success: false,
      statusCode: 500,
      message: 'Prisma Engine Panic',
      errorMessage:
        'The underlying Prisma engine crashed. Restart the server or check your database configuration.',
      errorDetails: error,
    };
  }

  // 4️⃣ PrismaClientInitializationError → (Engine initialization failed)
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      success: false,
      statusCode: 500,
      message: 'Prisma Initialization Error',
      errorMessage:
        'Failed to initialize Prisma Client. Verify DB credentials or connection URL.',
      errorDetails: error,
    };
  }

  // 5️⃣ PrismaClientValidationError → (Invalid query or missing data)
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      success: false,
      statusCode: statusCodeDefault,
      message: 'Validation Error',
      errorMessage: error?.message || '',
      errorDetails: error,
    };
  }

  // 6️⃣ Prisma-like Error (unknown but with P-code)
  const isPrismaError =
    (error as any)?.code && typeof (error as any)?.code === 'string' && (error as any)?.code.startsWith?.('P');
  if (isPrismaError) {
    return {
      success: false,
      statusCode: 500,
      message: `Unhandled Prisma Error (${(error as any).code})`,
      errorMessage: (error as any).message || 'Unhandled Prisma Error Occurred',
      errorDetails: error,
    };
  }

  // 7️⃣ Fallback for truly unknown errors
  return {
    success: false,
    statusCode: 500,
    message: 'Unknown Error',
    errorMessage: (error as Error)?.message || 'Unexpected error occurred',
    errorDetails: error,
  };
};

export default handlePrismaError;
