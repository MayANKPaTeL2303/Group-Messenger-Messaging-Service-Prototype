import UserModel from "@model/User";
import dbConnect from "@utils/dbConnect";
import GroupModel from "@model/Group";
import MessageModel from "@model/Message";
import { Server } from "socket.io";

// Create a Socket.IO server instance if it doesn't already exist
const initSocket = (server) => {
  if (!io) {
    io = new Server(server);
  }
};

export async function POST(req) {
  //Use POST request for sending thr message
  await dbConnect();
  initSocket(req.socket.server); // Initialize Socket.IO with the Next.js server

  const session = await getServerSession(authOptions); //Get the currently logged in user
  const user = session?.user; //If user is there than get user
  const { content } = await request.json(); //get username and content and fetch it

  try {
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    } else {
      const newmessage = {
        content,
        createdAt: new Date(),
      };
      //Push it in user message
      user.messages.push(newmessage);
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Message send successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error adding messages",
      },
      { status: 500 } //Forbidden status
    );
  }
}
