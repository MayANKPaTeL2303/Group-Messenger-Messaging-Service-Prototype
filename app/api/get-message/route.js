import { getServerSession } from "next-auth"; //Get the session from the backend
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@utils/dbConnect";
import UserModel from "@model/User";
import mongoose from "mongoose";

//Get all the messages
export async function GET(req) {
  await dbConnect();
  //Get the currently login user
  //Session is used to maintained the state of which use is currently logged in
  const session = await getServerSession(authOptions);
  const user = session?.user; //If user is there than get user

  if (!session || !session.user) {
    //If there is no session or in session there is not user
    return Response.json(
      {
        success: false,
        message: "Not authenticated user",
      },
      { status: 401 }
    );
  }

  //Aggregation pipeline

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
        {$match: {id: userId}},               //Match the userid
        {$unwind: '$messages'},               //Unwind the message and make different data field
        {$sort: {'messages.createdAt': -1}},   //Sort the messages
        {$group: {_id: '$_id',messages: {$push: '$messages'}}}       //One group for each id has been created for each user have messages in the sorting order
    ])
    if(!user || user.length === 0)
    {
        return Response.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 401 }
          );
    }
    else
    {
        return Response.json(
            {
              success: true,
              message: user[0].messages,
            },
            { status: 200 }
          );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server error"
      },
      { status: 500 }
    );
  }


}
