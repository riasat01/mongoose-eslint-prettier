import { AcademicSemesterCodeMapper } from './academicSemester.constants';
import IAcademicSemester from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {
  if (AcademicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error(`Invalid semester code`);
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
};
