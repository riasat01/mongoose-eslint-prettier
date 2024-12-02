import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error) {
    res.json({
      success: false,
      message: `Global error handler is saying something went wrong!`,
      error,
    });
  }
  // next();
};

export default globalErrorHandler;
