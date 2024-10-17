import {z} from 'zod';

export const forgotpasswordSchema = z.object({
    identifier: z.string(),
    newpassword: z.string(),
    confirmPassword: z.string(),
    username: z.string(),
})