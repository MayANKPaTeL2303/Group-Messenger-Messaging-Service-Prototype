import { z } from 'zod'

//Define the message which is how the message should be define
const messageSchema = z.object({
    //Content of the message
  content: z
    .string()
    .min(2, { message: 'Content must be at least 2 characters.' })
    .max(300, { message: 'Content must not be longer than 300 characters.' }),
});

module.exports = {messageSchema};