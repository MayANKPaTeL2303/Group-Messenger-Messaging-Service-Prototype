import dbConnect from '@utils/dbConnect';
import UserModel from '@model/User';
import bcrypt from 'bcryptjs';

export async function POST(request)
{
    await dbConnect();     //Check the database connection 

    try {
        const {username, email, password} =await request.json();    //Take the request from the post request and fetch the data.
        
        //Check if the username is present or not
        /////USERNAME CHECKING PART ///////
        const existingusername = await UserModel.findOne({username});
        const existinguserbyemail = await UserModel.findOne({email});
        if(existingusername)
        {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Username is already taken',
                }),
                {
                    status: 400              //(Bad Request)
                }
            );
        }
        ///////EMAIL CHECKING PART/////////

        if(existinguserbyemail)
        {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Email is already taken',
                }),
                {
                    status: 400              //(Bad Request)
                }
            );
        }
        
            //Create the data and hash the password
            const saltRound = await bcrypt.genSalt(9);
            const hash_password = await bcrypt.hash(password, saltRound);

            const newUser = new UserModel({
                username,
                email,
                password: hash_password,
                status: true,
                message: [],
            })
            await newUser.save();

            return Response.json({
                success: true,
                message: "User created successfully",
            },{status: 201})                //HTTPS response have led to creation of resource
    } catch (error) {                       //Generic Error  
        console.log("Error registering error: ",error);
        return Response.json({
            success: false,
            message: 'Error registering user',
        },{status: 500}
    );
    }


}