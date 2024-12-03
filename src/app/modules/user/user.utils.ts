import IAcademicSemester from "../academic-semester/academicSemester.interface";
import User from "./user.model";

const findLastStudentId = async() => {
    const lastStudent = await User.findOne(
        {
          role: 'student',
        },
        {
          id: 1,
          _id: 0,
        },
      )
        .sort({
          createdAt: -1,
        })
        .lean();
    return lastStudent?.id ? lastStudent.id.substring(6, 10) : undefined
}

export const generateStudentId = async (payload: IAcademicSemester) => {
    const currentId: string = await findLastStudentId() || (0).toString();
    let incrementId: string = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${(payload.year).getFullYear()}${payload?.code}${incrementId};`
    return incrementId;
};