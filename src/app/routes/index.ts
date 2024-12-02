import { Router } from 'express';

import StudentRouter from '../modules/student/student.route';
import UserRouter from '../modules/user/user.route';
import AcademicSemesterRouter from '../modules/academic-semester/academicSemester.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRouter,
  },
  {
    path: '/students',
    router: StudentRouter,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.router));

// router.use('/students', StudentRouter);
// router.use('/users', UserRouter);

export default router;
