import { getServerSession } from "next-auth"; //Get the session from the backend
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@utils/dbConnect";
import UserModel from "@model/User";

//Post request to update the session
export async function POST(req) {
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

  const userId = user._id; //Id of the session user
  const { acceptMessages } = await request.json();
  try {
    //Update the user message acceptance status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { status: acceptMessages },
      { new: true }
    ); //new value is true
    if (!updatedUser) {
      //Did not get the updated user
      return Response.json(
        {
          success: false,
          message: "Fail to update the user status for the accepting message",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Message acceptance status updated successfully",
          updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Fail to update user status to accept messages");
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

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

  const userId = user._id;

  const foundUser = await UserModel.findById(userId);
  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          success: true,
          status: foundUser.status,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      { status: 500 }
    );
  }
}
