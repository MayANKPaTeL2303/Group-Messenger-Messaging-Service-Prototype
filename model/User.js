import mongoose from 'mongoose';

// Define the Message schema
const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Updated User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

// Check if the model already exists and create or reuse it
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
