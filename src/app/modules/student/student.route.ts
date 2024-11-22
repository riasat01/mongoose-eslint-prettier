import { Router } from 'express';
import { Studentcontroller } from './student.controller';

const router = Router();
router.post(`/create-student`, Studentcontroller?.createStudent);
export default router;
