import IStudent from './student.interface';
import Student from './student.model';

const createStudentIntoDb = async (student: IStudent) => {
  const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
