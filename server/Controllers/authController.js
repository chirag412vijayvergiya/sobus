const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');
const { default: axios } = require('axios');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    // expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minute from now

    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure attribute based on environment
    sameSite: 'None', // Set sameSite attribute
    // domain: 'localhost', // Set domain to localhost
  };
  // console.log(token);
  // console.log(cookiesOptions);
  res.cookie('jwt', token, cookiesOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm, captchaToken } = req.body;

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    {},
    {
      params: {
        secret: recaptchaSecret,
        response: captchaToken,
      },
    },
  );

  const { success, score } = recaptchaResponse.data;

  if (!success || (score && score < 0.5)) {
    return res.status(400).json({
      status: 'fail',
      message: 'reCAPTCHA verification failed. Try again.',
    });
  }
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  // console.log(newUser);

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  // console.log('Token:', token);
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await sendEmail({
    email: newUser.email,
    subject: 'Welcome to SOBUS! Verify Your Email',
    message: `Dear ${newUser.name}, 
  
  Welcome to SOBUS! We're excited to have you on board.
  
  To get started, please verify your email by clicking the link below: 
  ${verificationLink}
  
  This link will expire in 24 hours.
  
  If you have any questions, feel free to reach out to us.
  
  Best regards,  
  SOBUS Team  
  
  Visit us: https://sobus.vercel.app`,
    html: `<p>Dear ${newUser.name},</p>
           <p>Welcome to <strong>SOBUS</strong>! We're excited to have you on board.</p>
           <p>To get started, please verify your email by clicking the link below:</p>
           <p><a href="${verificationLink}" style="color: #007bff; text-decoration: none;">Verify Email</a></p>
           <p><strong>Note:</strong> This link will expire in 24 hours.</p>
           <p>If you have any questions, feel free to reach out to us.</p>
           <p>Best regards,</p>
           <p><strong>SOBUS Team</strong></p>
           <p>Visit us: <a href="https://sobus.vercel.app" style="color: #007bff; text-decoration: none;">SOBUS</a></p>`,
  });

  // createSendToken(newUser, 201, res);

  // console.log(
  //   'User registered successfully! Please verify your email before logging in.',
  // );

  res.status(201).json({
    status: 'success',
    message:
      'User registered successfully! Please verify your email before logging in.',
  });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return next(new AppError('Invalid token', 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.userId) {
    return next(new AppError('Invalid token', 400));
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.isVerified = true;

  // console.log('user :- ', user);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully! You can now log in.',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || (!password && !req.body.googleId)) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  // console.log(user);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!user.isVerified) {
    return next(
      new AppError('Please verify your email before logging in.', 401),
    );
  }

  // If the user signed up using Google, check the googleId instead of password
  if (user.isGoogleUser() && !password) {
    return next(new AppError('Please log in using Google', 401));
  }

  // Validate the password for non-Google users
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(
        'You are not logged in! Please logged in to get access.',
        401,
      ),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'Thr user belonging to the token does no longer exist!',
        401,
      ),
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password!, Please login again!', 401),
    );
  }

  req.user = currentUser;
  // res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on POSTED email
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }

  //2) Generate the random token
  const resetToken = user.createPasswordResetToken();
  // console.log('Reset Token from controller:- ', resetToken);
  await user.save({ validateBeforeSave: false });
  //3)Send it back to user's email

  const message = `Forgot your password? Use the following Reset Token to reset your password: ${resetToken}\nIf you didn't request a password reset, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the token
  // console.log('Request :- ', req.params);
  // console.log('Request Body :- ', req.body);
  // console.log('Token from controller:- ', req.params.token);

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // console.log(user);
  //2)If token has not expired, and there is user, set the new passowrd
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  createSendToken(user, 200, res);
});

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   // console.log(req.body);
//   //1)Get user from collection
//   const user = await User.findById(req.user.id).select('+password');
//   //2)Check if posted current password is correct
//   if (
//     !user ||
//     !(await user.correctPassword(req.body.passwordCurrent, user.password))
//   ) {
//     return next(new AppError('Your current password is wrong', 401));
//   }
//   //3)If so, update password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();

//   createSendToken(user, 200, res);
// });

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Check if Google user
  if (user.isGoogleUser()) {
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
  } else {
    // Verify current password for non-Google users
    if (
      !req.body.passwordCurrent ||
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your current password is wrong', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
  }

  try {
    await user.save();
    createSendToken(user, 200, res);
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
});

exports.logout = (req, res) => {
  // console.log('Logging out...');
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure attribute based on environment
    sameSite: 'None',
  });
  res.status(200).json({ status: 'success' });
};
