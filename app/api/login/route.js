import UserModel from '@model/User';
import bcrypt from 'bcryptjs';
import dbConnect from '@utils/dbConnect'

export async function POST(request) {
    await dbConnect();     //Check the database connection 
  try {
    const { identifier, password } = await request.json(); // Extract credentials from the request body

    // Find the user by email or username
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // If no user is found, throw an error
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No user found with this email or username',
        }),
        {
          status: 400, // Bad Request
        }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, throw an error
    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Incorrect password',
        }),
        {
          status: 400, // Bad Request
        }
      );
    }

    // If everything is correct, return success response with user information
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
        },
      }),
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    // Generic error handling
    console.error("Error logging in user: ", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error logging in user',
      }),
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
