import {z} from 'zod'

//schema for user sign-in validation
const loginSchema = z.object({
    // 'identifier' is a required string (could be a username or email)
    identifier: z.string(),
    // 'password' is a required string
    password: z.string(),
});

module.exports = {loginSchema}