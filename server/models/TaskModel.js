const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please provide a task'],
  },
  status: {
    type: String,
    enum: ['pending', 'unread', 'accepted', 'rejected'],
    default: 'pending',
  },
  taskEndDate: {
    type: Date,
    required: [true, 'Please provide a task end date'],
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an assignee'],
  },
  activity: {
    type: mongoose.Schema.ObjectId,
    ref: 'Activities',
    required: [true, 'Please provide an activity'],
  },
  googleDriveLink: {
    type: String,
    required: false, // Not required at task assignment
  },
  description: {
    type: String,
    required: false, // Not required at task assignment
  },
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Admin ID
  },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
// ******************************************************************************* //
