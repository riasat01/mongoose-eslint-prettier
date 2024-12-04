import IAcademicFaculty from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (academicFaculty: IAcademicFaculty) => {
    const result = await AcademicFaculty.create(academicFaculty);
    return result;
};

const getAllAcademicFaculty = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFaculty = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateAcademicFaculty = async (id: string, payload: Partial<IAcademicFaculty>) => {
    const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}