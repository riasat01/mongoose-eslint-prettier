import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { IErrorSource } from '../interface/errorSource.interface';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  let statusCode = error?.statusCode || 500;
  let message = error?.message || `Something went wrong`;
  let errorSources: IErrorSource[] = [
    {
      path: '',
      message: '',
    },
  ]

  if(error instanceof ZodError){
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.name === 'CastError'){
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.code === 11000){
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }


  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
  });
  // next();
};

export default globalErrorHandler;
