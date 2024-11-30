import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
// import JoiStudentSchema from './joi.student.model';

const catchAsync = async (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `students are retrieved successfully`,
    data: result,
  });
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: `student is retrieved successfully`,
    data: result,
  });
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: `student is deleted successfully`,
    data: result,
  });
});

export const Studentcontroller = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};