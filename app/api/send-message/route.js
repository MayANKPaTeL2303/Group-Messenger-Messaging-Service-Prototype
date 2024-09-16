import UserModel from "@model/User";
import dbConnect from '@utils/dbConnect'
import MessageModel from '@model/Message'

export async function POST(req)          //Use POST request for sending thr message
{
    await dbConnect();
    const {username,content} = await request.json();   //get username and content and fetch it
    try{
        const user = await UserModel.findOne({username})
        if(!user)
        {
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 404 }
              );
        }
        else
        {
            //If user is not accepting the messages
            if(!user.status)
            {
                return Response.json(
                    {
                      success: false,
                      message: "User not accepting the message",
                    },
                    { status: 403 } //Forbidden status
                  );
            }
            const newmessage = {
                content,
                createdAt: new Date()
            }
            //Push it in user message
            user.messages.push(newmessage);
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "Message send successfully"
                },
                {status: 201}
            )
        }
    }
    catch(error)
    {
        return Response.json(
            {
              success: false,
              message: "Error adding messages",
            },
            { status: 500 } //Forbidden status
          );
    }

}