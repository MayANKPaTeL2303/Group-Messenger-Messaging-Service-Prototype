import GroupModel from "@model/Group";
import dbConnect from "@utils/dbConnect";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
  await dbConnect();
  try {
    const { code } = await req.json();

    if (!code) {
      return new Response({
        success: false,
        message: "No code is present",
      });
    }
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You must be logged in to create a group",
        }),
        {
          status: 401, // Unauthorized
        }
      );
    }

    const userId = session?.user?._id; // Get the user ID from the session
    const group = await GroupModel.findOne({ code });

    if (!group) {
      return new Response(
        {
          success: false,
          message: "Group Not found",
        },
        { status: 404 }
      );
    }

    // Add the user to the group members
    group.members.push(userId);
    await group.save();

    return new Response(
      {
        success: true,
        message: "Successfully Joined the group",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error joining the group:", error);
    return new Response({
      success: true,
      message: "Error in joining group",
    });
  }
}
