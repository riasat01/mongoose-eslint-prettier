import { Router } from 'express';
import { Studentcontroller } from './student.controller';

const router = Router();
router.post(`/create-student`, Studentcontroller?.createStudent);
router.get(`/`, Studentcontroller.getAllStudents);
router.get(`/:id`, Studentcontroller.getSingleStudent);
router.delete(`/:id`, Studentcontroller.deleteSingleStudent);
export default router;
