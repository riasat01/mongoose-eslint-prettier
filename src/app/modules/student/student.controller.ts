import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req?.body;
    const result = await StudentServices.createStudentIntoDb(student);
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

export const Studentcontroller = {
  createStudent,
};
