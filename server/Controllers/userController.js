const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const factory = require('./handleFactory');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users',
    format: async (req) => 'jpeg',
    public_id: (req) => `user-${req.user.id}-${Date.now()}`,
    transformation: [
      { width: 500, height: 500, crop: 'limit', quality: 'auto' },
    ],
  },
});

const multerFilter = (req, file, cb) => {
  // console.log(file.mimetype);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // console.log('Not an image! Please upload only image.');
    cb(new AppError('Not an image! Please upload only image.', 404), false);
  }
};

const upload = multer({ storage: cloudinaryStorage, fileFilter: multerFilter });
exports.uploadUserPhoto = upload.single('photo');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  const filteredBody = filteredObj(req.body, 'name');
  if (req.file) filteredBody.photo = req.file.path;
  const updateduser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateduser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = factory.getOne(User);

//Do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.makeAdmin = catchAsync(async (req, res, next) => {
  const currentUser = req.user; // Assuming req.user contains information about the currently logged-in user

  const { emailId } = req.body;

  // Check if the emailId provided is the same as the currently logged-in user's email
  if (emailId === currentUser.email) {
    return next(new AppError('You cannot promote yourself to admin.', 403));
  }

  // Find and update the user's role to 'admin'
  const user = await User.findOneAndUpdate(
    { email: emailId }, // Query to find the user
    { role: 'admin' }, // Update the role
    { new: true }, // Option to return the updated document
  );

  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.getAllUsers = factory.getAll(User, 'name email photo');
exports.getCOEMembers = factory.getAll(User, 'name email photo team role', [], {
  team: 'COE',
});

exports.getAvinyaMembers = factory.getAll(
  User,
  'name email photo team role',
  [],
  {
    team: 'Avinya',
  },
);
