import mongoose from "mongoose";
import { IErrorSource } from "../interface/errorSource.interface";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
    const errorSources: IErrorSource[] = Object.values(error?.errors)?.map((errorValue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: errorValue?.path,
            message: errorValue?.message,
        }
    });
    const statusCode = 400;
    
    return {
        statusCode,
        message: `Validation error`,
        errorSources
    }
}

export default handleValidationError;