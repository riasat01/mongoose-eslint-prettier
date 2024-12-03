import { model, Schema } from 'mongoose';
import validator from 'validator';
import IStudent, {
  // CustomStudentModel,
  IGuardian,
  ILocalGuardian,
  IUserName,
  // StudentMethods,   for custom instance
} from './student.interface';
import User from '../user/user.model';

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more than 20 characters'],
    validate: [
      {
        validator: function (value: string) {
          const fname =
            value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
          return fname === value;
        },
        message: '{VALUE} is not in capitalize format',
      },
      {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid, only alphabets are allowed',
      },
    ],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle Name cannot be more than 20 characters'],
    validate: [
      {
        validator: function (value: string) {
          if (value) {
            const mname =
              value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
            return mname === value;
          }
          return true; // Allow empty middle name
        },
        message: '{VALUE} is not in capitalize format',
      },
      {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid, only alphabets are allowed',
      },
    ],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last Name cannot be more than 20 characters'],
    validate: [
      {
        validator: function (value: string) {
          const lname =
            value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
          return lname === value;
        },
        message: '{VALUE} is not in capitalize format',
      },
      {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid, only alphabets are allowed',
      },
    ],
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
    maxlength: [50, 'Father name cannot be more than 50 characters'],
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       const fname =
    //         value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
    //       return fname === value;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    //   {
    //     validator: (value: string) => validator.isAlpha(value),
    //     message: '{VALUE} is not valid, only alphabets are allowed',
    //   },
    // ],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    maxlength: [50, 'Father occupation cannot be more than 50 characters'],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
    // validate: {
    //   validator: (value: string) => /^(\+?[0-9]{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?[\d\-]{7,15}$/.test(value),
    //   message: "Father's Contact Number must be a valid phone number (including country code if applicable)",
    // },
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
    maxlength: [50, 'Mother name cannot be more than 50 characters'],
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       const mname =
    //         value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
    //       return mname === value;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    //   {
    //     validator: (value: string) => validator.isAlpha(value),
    //     message: '{VALUE} is not valid, only alphabets are allowed',
    //   },
    // ],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    maxlength: [50, 'Mother occupation cannot be more than 50 characters'],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
    // validate: {
    //   validator: (value: string) => /^(\+?[0-9]{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?[\d\-]{7,15}$/.test(value),
    //   message: "Mother's Contact Number must be a valid phone number (including country code if applicable)",
    // },
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Local Guardian name cannot be more than 50 characters'],
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       const gname =
    //         value?.charAt(0).toUpperCase() + value?.slice(1)?.toLowerCase();
    //       return gname === value;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    //   {
    //     validator: (value: string) => validator.isAlpha(value),
    //     message: '{VALUE} is not valid, only alphabets are allowed',
    //   },
    // ],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    maxlength: [50, 'Occupation cannot be more than 50 characters'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required'],
    // validate: {
    //   validator: (value: string) => /^(\+?[0-9]{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?[\d\-]{7,15}$/.test(value),
    //   message: 'Contact Number must be a valid phone number (including country code if applicable)',
    // },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [100, 'Address cannot be more than 100 characters'],
  },
});

// for custom instance
// const studentSchema = new Schema<IStudent, CustomStudentModel, StudentMethods>({

// for custom static
// const studentSchema = new Schema<IStudent, CustomStudentModel>({

// normal one
const studentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: [true, `Id is required`],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: User,
    },
    name: {
      type: userNameSchema,
      required: [true, `Name is required`],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: `Gender value must be either 'male', 'female' or 'other'. {VALUE} is not valid`,
      },
      required: [true, `Gender is required`],
    },
    dateOfBirth: Date,
    email: {
      type: String,
      required: [true, `Email is required`],
      unique: true,
      validate: {
        validator: (value: string) => validator?.isEmail(value),
        message: `{VALUE} is not a  valid email address`,
      },
    },
    contactNo: {
      type: String,
      required: [true, `Contact Number is required`],
    },
    emergencyContactNo: {
      type: String,
      required: [true, `Emergency Contact Number is required`],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: `Blood Group must be either 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+' or 'AB-'`,
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, `Present Address is required`],
    },
    parmanentAddress: {
      type: String,
      required: [true, `Parmanent Address is required`],
    },
    guardian: {
      type: guardianSchema,
      required: [true, `Guardian is required`],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, `Local Guardian is required`],
    },
    profileImage: String,
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: Boolean,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for custom static
// studentSchema.statics.isStudentExist = async (id: string) => {
//   const existingStudent = await Student.findOne({id});
//   return existingStudent;
// }
// const Student = model<IStudent, CustomStudentModel>('Student', studentSchema);

// for custom instance

// studentSchema.methods.isStudentExist = async (id: string) => {
//   const existingStudent = await Student.findOne({id});
//   return existingStudent;
// }

// const Student = model<IStudent, CustomStudentModel>('Student', studentSchema);

// normal one
const Student = model<IStudent>('Student', studentSchema);
export default Student;
