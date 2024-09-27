const Task = require('../models/TaskModel');
const User = require('../models/userModel');
const Activity = require('../models/activityModel');

const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

exports.createTask = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const { id } = req.params;

  // Find the assignee by email
  const assigneeUser = await User.findOne({ email: req.body.assigneeEmail });

  // If no user is found with that email, throw an error
  if (!assigneeUser) {
    return next(new Error('Assignee with this email does not exist')); // Passes the error to next middleware
  }

  // Find the activity by its ID to get the activity name
  const activity = await Activity.findById(id);
  // console.log(activity);
  if (!activity) {
    return next(new Error('Activity with this ID does not exist'));
  }

  // Create the task using the found user's ObjectId and the provided end date
  const task = await Task.create({
    task: req.body.task,
    assignee: assigneeUser._id, // Assign the ObjectId of the user
    taskEndDate: new Date(req.body.taskEndDate), // Assign task end date
    activity: id, // Assign the ObjectId of the activity
  });

  // Format the task end date for the email
  const formattedEndDate = new Date(req.body.taskEndDate).toLocaleDateString();

  // Prepare the email message, including the Activity Name
  const emailMessage = `Dear ${assigneeUser.name},\n\nYou have been assigned a new task:\n\nTask: ${req.body.task}\nActivity: ${activity.activityName}\nTask End Date: ${formattedEndDate}\n\nPlease make sure to complete it by the deadline.\n\nBest regards,\nAdmin Team`;

  // Send the email to the assignee
  await sendEmail({
    email: assigneeUser.email,
    subject: 'New Task Assigned',
    message: emailMessage,
  });

  // Send the successful response
  res.status(201).json({
    success: true,
    data: task,
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find all tasks for the activity
  const tasks = await Task.find({ activity: id }).populate('assignee');

  // Send the response
  res.status(200).json({
    success: true,
    data: tasks,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new Error('Task with this ID does not exist'));
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return next(new Error('Task with this ID does not exist'));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
});

exports.getMyTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ assignee: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {
      tasks,
    },
  });
});
