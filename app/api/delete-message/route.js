import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/utils/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options"; //Importing authentication options

export async function DELETE(req, { params }) {
  const messageId = params.messageid; //Extract the message id from the parameter
  await dbConnect();

  //Current user session
  const session = await getServerSession(authOptions);
  const _user = session?.user; //Extracting the user from the session

  // Check if the user is authenticated
  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" }, // Returning an error message for unauthenticated users
      { status: 401 } // Setting HTTP status to 401 (Unauthorized)
    );
  }

  try {
    //Updating the user document to remove the message
    const updateResult = await UserModel.updateOne(
      { _id: _user._id }, // Finding the user by their ID
      { $pull: { messages: { _id: messageId } } } // Removing the message from the user's messages array
    );

    //Checking if the no user have been modified

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: "Message not found or already deleted", success: false }, // Returning a not found message
        { status: 404 } // Setting HTTP status to 404 (Not Found)
      );
    }
    // Returning a success message if the message was deleted successfully
    return Response.json(
      { message: "Message deleted", success: true }, // Message deletion success
      { status: 200 } // Setting HTTP status to 200 (OK)
    );
  } catch (error) {
    console.error("Error deleting message:", error); // Logging any errors that occur during deletion
    return Response.json(
      { message: "Error deleting message", success: false }, // Returning a generic error message
      { status: 500 } // Setting HTTP status to 500 (Internal Server Error)
    );
  }
}
