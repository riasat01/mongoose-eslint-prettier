import IAcademicSemester from '../academic-semester/academicSemester.interface';
import User from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  const lastStudentId: string | undefined = await findLastStudentId();
  const currentYear: string = payload.year.getFullYear().toString();
  const currentStudentSemesterCode: string = payload.code;
  let lastStudentSemesterCode: string = '';
  let lastStudentYear: string = '';
  let currentId: string = (0).toString();
  if (lastStudentId) {
    lastStudentSemesterCode = lastStudentId.substring(4, 6);
    lastStudentYear = lastStudentId.substring(0, 4);
  }
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId: string = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year.getFullYear()}${payload?.code}${incrementId}`;
  return incrementId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
