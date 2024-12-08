import { Router } from 'express';
import { Studentcontroller } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = Router();
router.get(`/`, Studentcontroller.getAllStudents);
router.get(`/:id`, Studentcontroller.getSingleStudent);
router.patch(
  `/:id`,
  validateRequest(studentValidations.updateStudentValidationSchema),
  Studentcontroller.upadateSingleStudent,
);
router.delete(`/:id`, Studentcontroller.deleteSingleStudent);
export default router;
