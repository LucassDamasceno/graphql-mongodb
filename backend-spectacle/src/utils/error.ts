import { HttpException } from '@nestjs/common';

export class HttpError extends HttpException {
  constructor(message: string, statusCode: number, error = 'error') {
    super({ statusCode, message, error }, statusCode);
  }
}

export const buildError = (
  error: any,
  genericMessage = 'An unknown error has occurred',
) => {
  switch (error.constructor.name) {
    case 'PrismaClientKnownRequestError':
      throw new HttpError(error.message, 400, error.name);
    case 'PrismaClientUnknownRequestError':
      throw new HttpError(error.message, 400, error.name);
    case 'PrismaClientRustPanicError':
      throw new HttpError(error.message, 400, error.name);
    case 'PrismaClientInitializationError':
      throw new HttpError(error.message, 400, error.name);
    case 'PrismaClientValidationError':
      throw new HttpError(error.message, 400, error.name);
    case 'JsonWebTokenError':
      throw new HttpError(error.message, 400, error.name);
    case 'TokenExpiredError':
      throw new HttpError(error.message, 400, error.name);
    case 'HttpError':
      throw new HttpError(
        error.response.message,
        error.response.statusCode,
        error.response.error,
      );
    case 'FirebaseAuthError':
      throw new HttpError(error.message, 400, error.code);
    default:
      throw new HttpError(genericMessage, 500, 'error');
  }
};
