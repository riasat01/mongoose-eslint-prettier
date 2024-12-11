import {
  IErrorSource,
  IGenericErrorResponse,
} from '../interface/errorSource.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): IGenericErrorResponse => {
  const match = error?.message?.match(/"([^"]*)"/);
  const extrectedMessage = match && match[1];
  const errorSources: IErrorSource[] = [
    {
      path: '',
      message: `${extrectedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `Invalid ID`,
    errorSources,
  };
};

export default handleDuplicateError;
