import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';

export interface IUserName {
    firstName: string;
    middleName: string;
    lastName: string;
};

export interface IFaculty {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: IUserName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
};

export interface FacultyModel extends Model<IFaculty> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<IFaculty | null>;
}