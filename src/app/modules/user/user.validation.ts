import { z } from 'zod';

const userValidationSchema = z.object({
  // id: z.string(),
  password: z
    .string({ invalid_type_error: `password must be a string` })
    .max(20, { message: `password can't be more than 20 characters` }),
  // needsPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(['admin', 'faculty', 'student']),
  // status: z.enum(['in-progress', 'blocked']),
  // isDeleted: z.boolean().optional().default(false)
});

export default userValidationSchema;
