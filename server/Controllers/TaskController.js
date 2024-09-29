const Task = require('../models/TaskModel');
const User = require('../models/userModel');
const Activity = require('../models/activityModel');

const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

exports.createTask = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const { id } = req.params;

  console.log(req.body);

  // Find the assignee by email
  const assigneeUser = await User.findOne({ email: req.body.data.email });

  console.log(assigneeUser);

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
    task: req.body.data.task,
    assignee: assigneeUser._id, // Assign the ObjectId of the user
    taskEndDate: new Date(req.body.data.deadline), // Assign task end date
    activity: id, // Assign the ObjectId of the activity
  });

  // Format the task end date for the email
  const formattedEndDate = new Date(
    req.body.data.deadline,
  ).toLocaleDateString();

  // Prepare the email message, including the Activity Name
  const emailMessage = `Dear ${assigneeUser.name},\n\nYou have been assigned a new task:\n\nTask: ${req.body.data.task}\nActivity: ${activity.activityName}\nTask End Date: ${formattedEndDate}\n\nPlease make sure to complete it by the deadline.\n\nBest regards,\nAdmin Team`;

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

  console.log(req.body);

  // Find the task to update
  const task = await Task.findById(id);
  if (!task) {
    return next(new Error('Task with this ID does not exist'));
  }

  // Find the assignee by email (you might want to modify this logic based on your application)
  const assigneeUser = await User.findById(task.assignee);
  if (!assigneeUser) {
    return next(new Error('Assignee does not exist'));
  }

  // Create a new object to update, mapping `deadline` to `taskEndDate`
  const updateData = {
    ...req.body, // Spread the rest of the fields
    taskEndDate: req.body.deadline ? new Date(req.body.deadline) : undefined, // Convert `deadline` to Date if it exists
  };

  // Remove the original `deadline` property if it exists
  delete updateData.deadline;

  // Update the task
  const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // Format the updated task end date for the email
  const formattedEndDate = updatedTask.taskEndDate.toLocaleDateString();

  // Prepare the email message
  const emailMessage = `Dear ${assigneeUser.name},\n\nYour task "${updatedTask.task}" has been updated.\n\nNew Status: ${updatedTask.status}\nTask End Date: ${formattedEndDate}\n\nPlease check your tasks for further details.\n\nBest regards,\nAdmin Team`;

  // Send the email to the assignee
  await sendEmail({
    email: assigneeUser.email,
    subject: 'Task Updated Notification',
    message: emailMessage,
  });

  res.status(200).json({
    success: true,
    data: updatedTask,
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
