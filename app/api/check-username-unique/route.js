import dbConnect from '@lib/dbConnect'
import UserModel from '@model/User'
import {z} from 'zod'
import { usernameValidation } from '@schemas/signupSchema'

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

//Check the Username is unique

export async function GET(req)
{
    //Databases connection
    await dbConnect();
    try {
        const {searchParams} = new URL(req.url);
        const queryParam = {                      //Extract the username parameter from the url (after question mark)
            username: searchParams.get('username')
        }

        //VALIDATION WITH THE HELP OF ZOD
        const name = UsernameQuerySchema.safeParse(queryParam)
        console.log(name);    //Check to remove
        if(!name.success)
        {
            // const usernameError = name.error.format().username?._errors || []        //Extract the error of the username from all the error           
            return Response.json({
                success: false,
                message: "Invalid Username"
            },{status: 400})
        }

        const {username} = name.data

        const existingUsername = await UserModel.findOne({username})
        if(existingUsername)
        {
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{status: 400})
        }
        else
        {
            return Response.json({
                success: true,
                message: "Username is unique"
            },{status: 200})
        }

        
    } catch (error) {
        console.log("Error checking username",error)
        return Response.json({
            success: false,
            message: "Error checking username"
        },{status: 500})
    }
}

 