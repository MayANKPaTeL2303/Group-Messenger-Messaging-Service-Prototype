import NextAuth from 'next-auth'; // Import the NextAuth function for authentication(Handling authentication logic)
import { authOptions } from './option'; // Import the authentication options from the options file

// Initialize NextAuth with the provided options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
