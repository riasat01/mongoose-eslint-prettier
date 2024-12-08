import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation';

const router = Router();

router.post(
  `/create-student`,
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController?.createStudent,
);

export default router;
