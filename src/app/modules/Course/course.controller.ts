import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';


const createCourse = catchAsync(async (req, res) => {
    const course = req.body;
    const result =
        await CourseServices.createCourseIntoDB(course);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Course created successfully`,
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Courses are retrieved successfully',
        data: result,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty is retrieved succesfully',
        data: result,
    });
});

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Academic Faculty is updated succesfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});


export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
};
