// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   googleId: String,
//   name: {
//     type: String,
//     required: [true, 'Please tell us your name!'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide your email'],
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, 'Please provide your email'],
//   },
//   photo: {
//     type: String,
//     default:
//       'https://res.cloudinary.com/dp9qfnorl/image/upload/v1725437211/users/user-66d8121d649b70724a10998d-1725437210037.jpg',
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   password: {
//     type: String,
//     required: [true, 'Please provide a password'],
//     minlength: 8,
//     select: false,
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, 'Please confirm your password'],
//     minlength: 8,
//     validate: {
//       //This only works on create and save!!
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: 'Passwords are not the same!',
//     },
//   },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   active: {
//     type: Boolean,
//     default: true,
//     select: false,
//   },
// });

// //This middleware will work between the getting the data and saving the data
// userSchema.pre('save', async function (next) {
//   //only run when this password is modified
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12); //encrypt(HASH) the password at cost 12
//   //After validation successful we no longer need the passwordConfirm
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password') || this.isNew) return next();

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword,
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword); //return true or false value
// };

// userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );

//     return JWTTimestamp < changedTimestamp;
//   }

//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 * seconds * 1000 for miliseconds

//   return resetToken;
// };

// // If user logs in with Google, password is not required
// userSchema.methods.isGoogleUser = function () {
//   return !!this.googleId;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/dp9qfnorl/image/upload/v1725437211/users/user-66d8121d649b70724a10998d-1725437210037.jpg',
    },
    // In Sobus case, we have two teams, COE and Avinya
    team: {
      type: String,
      enum: ['COE', 'Avinya', 'Both', 'Other'],
      default: 'Other',
    },
    // In Sobus case, we have two roles, admin and user and two more roles for COE and Avinya
    role: {
      type: String,
      enum: ['user', 'admin', 'adminCOE', 'adminAvinya'],
      default: 'user',
    },
    password: {
      type: String,
      required: function () {
        // Only require password if not a Google user
        return !this.googleId;
      },
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: function () {
        // Only require passwordConfirm if not a Google user
        return !this.googleId;
      },
      validate: {
        // This only works on 'save' and 'create'
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match!',
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'assignee',
  localField: '_id',
});

// Middleware to hash password if it's changed
userSchema.pre('save', async function (next) {
  // console.log('hello from user model');
  // Skip if password is not modified or if it's a Google sign-in
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // No need to store the passwordConfirm field in the database
  this.passwordConfirm = undefined;
  next();
});

// Middleware to set passwordChangedAt field
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Exclude inactive users from query results
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Method to check if passwords match
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to check if the password was changed after JWT was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (!this.password && this.googleId) {
    return false; // Assume no password change for Google OAuth users
  }

  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Create and hash a password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log('Heashed Token from model :- ', this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

  return resetToken;
};

// Method to check if user signed up with Google
userSchema.methods.isGoogleUser = function () {
  return !!this.googleId;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
