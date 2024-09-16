import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Group schema(Group Details)
const GroupSchema = new Schema({
  grp_id: {
    type: String,
    required: true,
    unique: true   //Group id should be unique
    
  },
  grp_name: {
    type: String,
    required: true,
    trim: true, // Removes extra whitespace
    unique: true, // Username should be unique
  }
});

// Create or get the existing Message model
const GroupModel = mongoose.models.Group || model('Group', GroupSchema);

module.exports = GroupModel;  // Export the Message model for use in other parts of the application
