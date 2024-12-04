import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDb(
      academicFaculty,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Academic Faculty created successfully`,
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Facultys are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDb(FacultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    FacultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty is updated succesfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
