import config from '../../config';
import IStudent from '../student/student.interface';
import IUser from './user.interface';
import Student from '../student/student.model';
import User from './user.model';

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  // create new user

  const user: Partial<IUser> = {};
  user.password = password || config.default_password;
  user.role = 'student';
  user.id = '2030100001';
  const newUser = await User.create(user);

  // create new student

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = Student.create(studentData);
    return newStudent;
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

  return newUser;
};

export const UserServices = {
  createStudentIntoDb,
};
