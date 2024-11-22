import IStudent from './student.interface';
import Student from './student.model';

const createStudentIntoDb = async (student: IStudent) => {
  const result = await Student.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
};
