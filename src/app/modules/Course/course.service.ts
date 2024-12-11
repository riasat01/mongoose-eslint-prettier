import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { ICourse } from './course.interface';
import Course from './course.model';

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
  
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const updatedBaiscCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData
  );

  if (prerequisiteCourses && prerequisiteCourses.length > 0) {
    const deletedPrerequisites = prerequisiteCourses.filter(element => element.course && element.isDeleted).map(elem => elem.course);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const deletedPrerequisiteCourses = Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          'prerequisiteCourses': {
            'Course': {
              $in: deletedPrerequisites
            }
          }
        }
      }
    );

    const newPrerequisites = prerequisiteCourses?.filter(element => element.course && !element.isDeleted);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const newPrerequisiteCourses = Course.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          'prerequisiteCourses': {
            $each: newPrerequisites
          }
        }
      }
    );
  }

  const result = await Course.findById(id).populate('prerequisiteCourses.course')
  return result;
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
