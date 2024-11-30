import { RequestHandler } from 'express';
// import ZodStudentSchema from '../student/zod.student.model';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent: RequestHandler = async (req, res, next) => {
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
    sendResponse(res, {
      statusCode: 200,
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
