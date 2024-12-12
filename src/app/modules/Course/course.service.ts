import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import Course, { CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate(`prerequisiteCourses.course`),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  // console.log(courseQuery.modleQuery);
  const result = await courseQuery.modleQuery;
  //   const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    `prerequisiteCourses.course`,
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { prerequisiteCourses, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedBaiscCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBaiscCourseInfo) {
      throw new AppError(400, `Failed to update course`);
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      const deletedPrerequisites = prerequisiteCourses
        .filter((element) => element.course && element.isDeleted)
        .map((elem) => elem.course);
      const deletedPrerequisiteCourses = Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            prerequisiteCourses: {
              Course: {
                $in: deletedPrerequisites,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisiteCourses) {
        throw new AppError(400, `Failed to update course`);
      }

      const newPrerequisites = prerequisiteCourses?.filter(
        (element) => element.course && !element.isDeleted,
      );
      const newPrerequisiteCourses = Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            prerequisiteCourses: {
              $each: newPrerequisites,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPrerequisiteCourses) {
        throw new AppError(400, `Failed to update course`);
      }
    }
    const result = await Course.findById(id).populate(
      'prerequisiteCourses.course',
    );
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(400, `Failed to update course: ${error}`);
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
