import { model, Schema } from 'mongoose';
import IAcademicSemester from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.aggregate([
    {
      $match: {
        name: this?.name,
        year: this?.year,
      },
    },
  ]);
  if (isSemesterExists[0]) {
    throw new Error(`Semester already exists!`);
  }
  next();
});

const AcademicSemester = model<IAcademicSemester>(
  'academic-semester',
  academicSemesterSchema,
);

export default AcademicSemester;
