const Task = require('../models/TaskModel');
const User = require('../models/userModel');
const Activity = require('../models/activityModel');

const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
const AppError = require('../utils/AppError');

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
  const emailMessage = `Dear ${assigneeUser.name},\n\nYou have been assigned a new task:\n\nTask: ${req.body.data.task}\nActivity: ${activity.activityName}\nTask End Date: ${formattedEndDate}.\n\nYou can view your tasks here: https://sobus.vercel.app/my-tasks\n\nPlease make sure to complete it by the deadline.\n\nBest regards,\nAdmin Team`;

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
  const emailMessage = `Dear ${assigneeUser.name},\n\nYour task "${updatedTask.task}" has been updated.\n\nNew Status: ${updatedTask.status}\nTask End Date: ${formattedEndDate}\n\nPlease check your tasks for further details: https://sobus.vercel.app/my-tasks \n\nBest regards,\nAdmin Team`;

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
  const tasks = await Task.find({ assignee: req.user.id }).populate({
    path: 'activity',
    select: 'activityName',
  });

  res.status(200).json({
    status: 'success',
    data: {
      tasks,
    },
  });
});

exports.submitTask = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Task ID
  const { googleDriveLink, description } = req.body;
  const loggedInUserId = req.user.id; // Assume authentication middleware sets req.user

  // Find the task to verify assignee
  const task = await Task.findById(id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  // Check if the logged-in user is the assigned user
  if (task.assignee.toString() !== loggedInUserId) {
    return next(
      new AppError('You are not authorized to submit this task', 403),
    );
  }

  // Validate required fields manually
  if (!googleDriveLink || !description) {
    return next(
      new AppError('Google Drive link and description are required', 400),
    );
  }

  // Proceed with task submission
  task.googleDriveLink = googleDriveLink;
  task.description = description;
  task.submittedAt = Date.now();
  task.status = 'unread';

  await task.save();

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.reviewTask = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Task ID
  const { status } = req.body; // 'accepted' or 'rejected'
  const adminId = req.user.id; // Admin's ID from authentication

  if (!['accepted', 'rejected'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const reviewedAt = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });
  const task = await Task.findByIdAndUpdate(
    id,
    {
      status, // Update task status
      reviewedAt,
      reviewedBy: adminId,
    },
    { new: true, runValidators: true },
  ).populate('assignee', 'email name');

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  const subject = `Your Task Submission Has Been ${status.toUpperCase()} ${status === 'rejected' ? '🚫' : '🎉'}`;
  const message = `
    Hi ${task.assignee.name}, 
    
    Your task submission for "${task.task}" has been ${status}.
    
    ${status === 'rejected' ? 'Please review the task and submit again.' : 'Congratulations on the successful submission!'}
    
    Task Details:
    - Task Name: ${task.task}
    - Status: ${status.toUpperCase()}
    - Reviewed At: ${reviewedAt}

    Please check your tasks for further details : https://sobus.vercel.app/my-tasks

    If you have any questions, feel free to reach out.

    Best regards,
    The Task Management Team
  `;

  await sendEmail({
    email: task.assignee.email,
    subject,
    message,
  });

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});
