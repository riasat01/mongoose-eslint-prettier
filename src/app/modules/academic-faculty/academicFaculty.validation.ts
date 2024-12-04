import { z } from "zod"
const createAcademicFacultyValidationSchema = z.object({
    name: z.string({ invalid_type_error: `Academic Faculty name must be a string` })
})

export default createAcademicFacultyValidationSchema;