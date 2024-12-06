import { Types } from 'mongoose';

interface IAcademicDepartment {
  name: string;
  academicFaculty: Types.ObjectId;
}

export default IAcademicDepartment;
