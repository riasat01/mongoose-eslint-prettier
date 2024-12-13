import { Router } from 'express';

import StudentRouter from '../modules/student/student.route';
import UserRouter from '../modules/user/user.route';
import AcademicSemesterRouter from '../modules/academic-semester/academicSemester.route';
import AcademicFacultyRouter from '../modules/academic-faculty/academicFaculty.route';
import AcademicDepartmentRouter from '../modules/academic-department/academicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { semesterRegistrationRoutes } from '../modules/semester-registration/semesterRegistration.route';
import { offeredCourseRoutes } from '../modules/offered-course/offeredCourse.route';

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
  {
    path: '/academic-faculties',
    router: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRouter,
  },
  {
    path: '/faculties',
    router: FacultyRoutes,
  },
  {
    path: '/courses',
    router: CourseRoutes,
  },
  {
    path: '/admins',
    router: AdminRoutes,
  },
  {
    path: '/semester-registrations',
    router: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    router: offeredCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.router));

// router.use('/students', StudentRouter);
// router.use('/users', UserRouter);

export default router;
