// import ZodStudentSchema from '../student/zod.student.model';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;

  // Joi validation
  // const { error, value } = JoiStudentSchema.validate(student);
  // console.log(error, value);
  // if (error || !value) {
  //   res.status(500).json({
  //     succcess: false,
  //     message: `something went wrong while creating student`,
  //     error,
  //   });
  // }

  // zod validation

  // const zodParsedData = ZodStudentSchema.parse(student);
  // console.log(zodParsedData);
  // const result = await UserServices.createStudentIntoDb(zodParsedData);
  const result = await UserServices.createStudentIntoDb(password, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `student created successfully`,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
