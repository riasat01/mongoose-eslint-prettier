import mongoose from 'mongoose';
import {
  IErrorSource,
  IGenericErrorResponse,
} from '../interface/errorSource.interface';

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSources: IErrorSource[] = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `Invalid ID`,
    errorSources,
  };
};

export default handleCastError;
