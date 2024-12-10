import { model, Schema } from "mongoose";
import { ICourse, IPrerequisiteCourse } from "./course.interface";

const prerequisiteCourses = new Schema<IPrerequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: [true, `Course title is required`],
    },
    prefix: {
        type: String,
        trim: true,
        required: [true, `Prefix is required`],
    },
    code: {
        type: Number,
        required: [true, `Code is required`],
    },
    credit: {
        type: Number,
        required: [true, `Credit is required`],
    },
    prerequisiteCourses: [prerequisiteCourses],
});

const Course = model<ICourse>(`Course`, courseSchema);

export default Course;