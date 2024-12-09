import { ZodError } from "zod";
import { IErrorSource } from "../interface/errorSource.interface";
import config from "../config";

const handleZodError = (error: ZodError) => {
    const statusCode = 400;
    const errorSources: IErrorSource[] = error?.issues?.map(issue => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      }
    })
    return {
      statusCode,
      message: `Validation error`,
      errorSources,
      stack: config.NODE_ENV === 'development' ? error?.stack : null,
    }
  }
export default handleZodError;