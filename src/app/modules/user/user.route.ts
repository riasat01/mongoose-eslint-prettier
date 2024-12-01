import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/zod.student.model';

const router = Router();

router.post(
  `/create-student`,
  validateRequest(studentValidationSchema),
  UserController?.createStudent,
);

export default router;
