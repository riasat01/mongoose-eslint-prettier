import { NextFunction, Request, Response } from 'express';
// import ZodStudentSchema from '../student/zod.student.model';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    // Joi validation
    // const { error, value } = JoiStudentSchema.validate(student);
    // console.log(error, value);
    // if (error || !value) {
    //   res.status(500).json({
    //     succcess: false,
    //     message: `something went wrong while creating student`,
    //     error,
    //   });
    // }

    // zod validation

    // const zodParsedData = ZodStudentSchema.parse(student);
    // console.log(zodParsedData);
    // const result = await UserServices.createStudentIntoDb(zodParsedData);
    const result = await UserServices.createStudentIntoDb(password, student);
    res.status(200).json({
      success: true,
      message: `student created successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
