import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import JoiStudentSchema from './joi.student.model';
import ZodStudentSchema from './zod.student.model';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body?.student;

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

    const zodParsedData = ZodStudentSchema.parse(student);
    // console.log(zodParsedData);
    const result = await StudentServices.createStudentIntoDb(zodParsedData);
    // const result = await StudentServices.createStudentIntoDb(student);
    res.status(200).json({
      success: true,
      message: `student created successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      succcess: false,
      message: `something went wrong while creating student`,
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: `students are retrieved successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      succcess: false,
      message: `something went wrong while getting all the  students`,
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: `student is retrieved successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      succcess: false,
      message: `something went wrong while getting the student`,
      error,
    });
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: `student is deleted successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      succcess: false,
      message: `something went wrong while deleting the student`,
      error,
    });
  }
};

export const Studentcontroller = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
