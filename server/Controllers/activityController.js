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
  console.log(req);
  if (!req.file) return next(new AppError('Please upload a file', 404));

  // Save the file path or URL in the excelLink variable
  const excelLink = req.file.path || req.file.secure_url; // Depending on the setup

  // Update the Activity document with the new excelLink
  const activity = await Activity.findByIdAndUpdate(
    req.user.id,
    { excelLink }, // Add excelLink to the update
    { new: true, runValidators: true },
  );

  if (!activity) return next(new AppError('Activity not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      Activity: activity,
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