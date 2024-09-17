import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
    unique: true, // Ensures that each group name is unique
  },
  code: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The user who created the group
    required: true,
  },
});

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);

export default Group;
