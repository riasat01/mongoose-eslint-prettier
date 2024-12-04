import { model, Schema } from "mongoose";
import IAcademicFaculty from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const AcademicFaculty = model<IAcademicFaculty>('AcademicFaculty', academicFacultySchema);

export default AcademicFaculty;