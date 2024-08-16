const multer = require('multer');
const Activity = require('../models/activityModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isExcel =
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel';

    return {
      folder: 'Excel-Chat',
      format: 'xlsx',
      resource_type: isExcel ? 'raw' : 'auto', // Upload as raw file
      public_id: `excel-${req.user.id}-${Date.now()}`,
    };
  },
});

// ******************************************************************************* //
const multerFilter = (req, file, cb) => {
  // console.log(file);
  if (
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'application/vnd.ms-excel'
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not a valid file type! Please upload only Excel files.',
        404,
      ),
      false,
    );
  }
};
// ******************************************************************************* //

const upload = multer({ storage: cloudinaryStorage, fileFilter: multerFilter });

exports.uploadExcel = upload.single('file');
exports.saveExcel = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Extract activityId from the request parameters
  console.log(id);
  // console.log(req);
  // Check if the file is uploaded
  if (!req.file) {
    return next(new AppError('Please upload a file', 404));
  }

  // Get the file path or secure URL
  const excelLink = req.file.path || req.file.secure_url; // Depending on the setup

  // Find the activity by the activity ID and update it with the excelLink
  const activity = await Activity.findByIdAndUpdate(
    id, // Use activityId to find the specific Activity document
    { excelLink }, // Update the document with the file link
    { new: true, runValidators: true },
  );

  console.log(activity);

  // If the activity is not found, return an error
  if (!activity) {
    return next(new AppError('Activity not found', 404));
  }

  // Send the updated activity back in the response
  res.status(200).json({
    status: 'success',
    data: {
      activity,
    },
  });
});

exports.createActivity = catchAsync(async (req, res, next) => {
  //   console.log(req.body);
  const {
    data: {
      activityName,
      activityDescription,
      activityStartDate,
      activityEndDate,
      activityTime,
      activityLocation,
      GoogleFormLink,
    },
  } = req.body;

  const activityStartDateObj = new Date(activityStartDate);
  const activityEndDateObj = new Date(activityEndDate);

  const doc = await Activity.create({
    activityName,
    activityDescription,
    activityStartDate: activityStartDateObj,
    activityEndDate: activityEndDateObj,
    activityTime,
    activityLocation,
    GoogleFormLink,
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllActivities = factory.getAll(Activity);

exports.getActivity = factory.getOne(Activity);

exports.deleteActivity = factory.deleteOne(Activity);
