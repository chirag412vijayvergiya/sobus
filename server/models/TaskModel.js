const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please provide a task'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  taskEndDate: {
    type: Date,
    required: [true, 'Please provide a task end date'],
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a assignee'],
  },
  activity: {
    type: mongoose.Schema.ObjectId,
    ref: 'Activity',
    required: [true, 'Please provide a activity'],
  },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
// ******************************************************************************* //
