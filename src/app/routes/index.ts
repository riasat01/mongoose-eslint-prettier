import { Router } from 'express';

import StudentRouter from '../modules/student/student.route';
import UserRouter from '../modules/user/user.route';

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
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.router));

// router.use('/students', StudentRouter);
// router.use('/users', UserRouter);

export default router;
