import mongoose from "mongoose";

// Define the Message schema(Message Details)
const MessageSchema = new mongoose.Schema({
  content: {
    // Content of the message
    type: String,
    required: true,
  },
  createdAt: {
    //Data of creation of the message
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Create or get the existing Message model
const MessageModel = mongoose.models.Message || model('Message', MessageSchema);

module.exports = MessageModel;  // Export the Message model for use in other parts of the application
