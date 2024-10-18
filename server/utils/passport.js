// const passport = require('passport');
// const OAuth2Strategy = require('passport-google-oauth2').Strategy;
// const { signToken } = require('./jwt');
// const User = require('../models/userModel');

// passport.use(
//   'google-auth',
//   new OAuth2Strategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.SERVER_URL}/api/v1/users/auth/google/callback`,
//       scope: ['profile', 'email'],
//       prompt: 'select_account',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//           user = new User({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             photo: profile.photos[0].value,
//             role: 'user',
//           });
//           await user.save();
//         }

//         const token = signToken(user._id);
//         return done(null, { user, token, role: 'user' });
//       } catch (err) {
//         return done(err, null);
//       }
//     },
//   ),
// );

// module.exports = passport;
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const { signToken } = require('./jwt');
const User = require('../models/userModel');
const sendEmail = require('./email'); // Assuming you have an email utility function like in your signup

passport.use(
  'google-auth',
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/v1/users/auth/google/callback`,
      scope: ['profile', 'email'],
      prompt: 'select_account',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user exists with Google ID or email
        let user = await User.findOne({ googleId: profile.id });
        let isNewUser = false; // Flag to check if the user is new

        if (!user) {
          // Check if an account already exists with this email
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If a user is found with the same email, update the googleId field to link the accounts
            user.googleId = profile.id;
            user.photo = profile.photos[0]?.value || user.photo; // Update photo if provided
          } else {
            // If no user with this email, create a new one
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0]?.value || undefined, // Set photo if exists
              role: 'user',
            });
            isNewUser = true; // Mark user as new
          }
          // Save the user (either newly created or updated with Google ID)
          await user.save();

          // 2. Send welcome email if the user is new
          if (isNewUser) {
            await sendEmail({
              email: user.email,
              subject: 'Welcome to SOBUS!',
              message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board. If you have any questions, feel free to reach out to us.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
            });
          }
        }

        // 3. Generate JWT token for the user
        const token = signToken(user._id);

        // 4. Return user and token
        return done(null, { user, token });
      } catch (err) {
        // Handle any errors during the authentication process
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
