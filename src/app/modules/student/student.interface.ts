// import { Model } from 'mongoose';

import { Types } from 'mongoose';

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export default interface IStudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: IUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  isDeleted?: boolean;
}

// for creating static

// export interface CustomStudentModel extends Model<IStudent>{
//   isStudentExist(id: string): Promise<IStudent | null>;
// }

// for creating custom instance

// export type StudentMethods = {
//   isStudentExist: (id: string) => Promise<IStudent | null>;
// };

// export type CustomStudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   StudentMethods
// >;
