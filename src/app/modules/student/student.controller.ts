import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import JoiStudentSchema from './joi.student.model';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: `students are retrieved successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: `student is retrieved successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: `student is deleted successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const Studentcontroller = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
