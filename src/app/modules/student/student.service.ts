import mongoose from 'mongoose';
import Student from './student.model';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import IStudent from './student.interface';

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };
  const studentSearchTerms = ['name.firstName', 'email', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchTerms.map(field => (
      {
        [field]: { $regex: searchTerm, $options: 'i' },
      }
    ))
  });

  const excludeFields = ['searchTerms', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach(element => delete queryObject[element]);

  const filterQuery = searchQuery
    .find(queryObject)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = '-__v';
  
  if(query?.fields){
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldQuery = await limitQuery.select(fields);

  if (!fieldQuery.length) {
    throw new AppError(500, `No students found`);
  }
  return fieldQuery;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const result = await Student.aggregate([
  //   {
  //     $match: {
  //       id,
  //     },
  //   },
  // ]);
  if (!result) {
    throw new AppError(500, `No student found with this id`);
  }
  return result;
};
const updateSingleStudentIntoDb = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(400, `Failed to delelte student`);
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, `Failed to delete user`);
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error(`Something went wrong while deleting student ${error}`);
    // next(error)
    throw error;
  }
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
  updateSingleStudentIntoDb,
};
