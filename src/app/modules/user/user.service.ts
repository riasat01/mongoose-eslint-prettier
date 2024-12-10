import config from '../../config';
import IStudent from '../student/student.interface';
import IUser from './user.interface';
import Student from '../student/student.model';
import User from './user.model';
import AcademicSemester from '../academic-semester/academicSemester.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import IAcademicSemester from '../academic-semester/academicSemester.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { IFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academic-department/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';

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

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {

  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session }); // array

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDB
};
