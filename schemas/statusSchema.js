//Define the connection of user whether it is online or offline
import {z} from 'zod'

const AcceptMessageSchema = z.object({
    status: z.boolean(),
  });

module.exports = {AcceptMessageSchema};