import mongoose from "mongoose";

// Define a connection object to keep track of the connection state
const connection = {
    isConnected: 0
};

async function dbConnect() {
  // Check if already connected to the database
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return; 
  }

  try {
    // Attempt to connect to the database using the URI from environment variables
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    // Store the connection status (1 means connected, 0 means disconnected)
    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected successfully');
    
  } catch (error) {
    // If there's an error, log the error and gracefully exit the process
    console.error('Database connection failed:', error);
    process.exit(1);  // Exit the application with a failure status
  }
}

// Export the dbConnect function for use in other parts of the application
module.exports = dbConnect;
