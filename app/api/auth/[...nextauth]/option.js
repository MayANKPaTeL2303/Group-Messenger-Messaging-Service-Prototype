import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../utils/dbConnect';
import UserModel from '../../../../model/User';

//Added the token of group code with the session

// NextAuth options configuration
export const authOptions = {
  // Define authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' }, //Input field for identifier
        password: { label: 'Password', type: 'password' }, //Input field for password
      },
      async authorize(credentials) {
        await dbConnect(); //Connect the database

        try {
          // Find the user by email or username
          const user = await UserModel.findOne({        //Find the username or email of user
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          //If no user is found, then error
          if (!user) {
            throw new Error('No user found with this email or username');
          }
          
          // Compare the input password with the hashed password in the database
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } 
          else {      // If the password is incorrect, throw an error
            throw new Error('Incorrect password');
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    //Modify the JWT(JSON Web token) to include more detail of user
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.groupCode = user.groupCode
      }
      return token;
    },
    //Modify the session object to have te modified new token 
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.groupCode = token.groupCode;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',  //Use JWT for the session management
  },
  secret: process.env.NEXTAUTH_SECRETKEY, //Secret key for signing JWTs
  pages: {
    signIn: '/login', //Custom login page route
  },
};

// Export the NextAuth configuration
export default NextAuth(authOptions);
