import { Types } from 'mongoose';

export interface IPrerequisiteCourse {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface ICourse {
  title: string;
  credits: number;
  code: number;
  prefix: string;
  prerequisiteCourses: IPrerequisiteCourse[];
  isDeleted?: boolean;
}

export interface ICourseFaculty {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
}
