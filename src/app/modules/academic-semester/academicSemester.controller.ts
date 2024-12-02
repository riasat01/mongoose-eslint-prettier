import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDb(
      academicSemester,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Academic Semester created successfully`,
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
