import GroupModel from "@model/Group";
import dbConnect from "@utils/dbConnect";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export async function POST(req) {
  await dbConnect();
  try {
    const { groupname, code } = await req.json();
    const existGrpName = await GroupModel.findOne({ groupname });
    const existGrpCode = await GroupModel.findOne({ code });
    if (existGrpName) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Group Name already taken",
        }),
        {
          status: 400, // (Bad Request)
        }
      );
    }

    if (existGrpCode) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Enter the unique code",
        }),
        {
          status: 400, // (Bad Request)
        }
      );
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
    const newGroup = new GroupModel({
      groupname,
      code,
      members: [],
      createdBy: user._id,
    });
    await newGroup.save();

    return Response.json(
      {
        success: true,
        message: "Group Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating group: ", error);
    return Response.json(
      {
        success: false,
        message: "Error in creating group",
      },
      { status: 500 }
    );
  }
}
