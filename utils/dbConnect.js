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
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    // Store the connection status (1 - connected, 0 - disconnected)
    // console.log(db)
    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected successfully');
    
  } catch (error) {
    // If there's an error, exit the process
    console.error('Database connection failed:', error);
    process.exit(1);  
  }
}
module.exports = dbConnect;
