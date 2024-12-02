import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Academic Semester created successfully`,
    data: {},
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
