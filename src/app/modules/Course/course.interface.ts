import { Types } from "mongoose";

export interface IPrerequisiteCourse {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export interface ICourse {
    title: string;
    credit: number;
    code: number;
    prefix: string;
    prerequisiteCourses: IPrerequisiteCourse[];
}