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
}

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
}

export interface AdminModel extends Model<IAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IAdmin | null>;
}
