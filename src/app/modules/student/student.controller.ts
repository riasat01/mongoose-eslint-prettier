import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body?.student;
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

export const Studentcontroller = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
