import config from '../../config';
import IStudent from '../student/student.interface';
import IUser from './user.interface';
import Student from '../student/student.model';
import User from './user.model';
import AcademicSemester from '../academic-semester/academicSemester.model';
import { generateStudentId } from './user.utils';
import IAcademicSemester from '../academic-semester/academicSemester.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  // create new user

  const user: Partial<IUser> = {};
  user.password = password || config.default_password;
  user.role = 'student';

  const admissionSemester: IAcademicSemester | null =
    await AcademicSemester.findById(studentData?.admissionSemester);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (admissionSemester) {
      user.id = await generateStudentId(admissionSemester);
    }
    const newUser = await User.create([user], { session });

    // create new student

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(400, `Failed to create student`);
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent[0];
    // return newUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // for using custom static

  // if(await Student.isStudentExist(studentData?.id)){
  //   throw new Error(`Student already exists!`)
  // }

  // for using custom instance

  // const studentInstanceOfStudentModel = new Student(studentData);
  // if(await studentInstanceOfStudentModel.isStudentExist(studentData?.id)){
  //   throw new Error(`Student already exists!`)
  // }
  // const result = await studentInstanceOfStudentModel.save();
};

export const UserServices = {
  createStudentIntoDb,
};
