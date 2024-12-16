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
//         // 1. Check if user exists with Google ID or email
//         let user = await User.findOne({ googleId: profile.id });
//         let isNewUser = false; // Flag to check if the user is new

//         if (!user) {
//           // Check if an account already exists with this email
//           user = await User.findOne({ email: profile.emails[0].value });

//           if (user) {
//             // If a user is found with the same email, update the googleId field to link the accounts
//             user.googleId = profile.id;
//             user.photo = profile.photos[0]?.value || user.photo; // Update photo if provided
//           } else {
//             // If no user with this email, create a new one
//             user = new User({
//               googleId: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               photo: profile.photos[0]?.value || undefined, // Set photo if exists
//               role: 'user',
//             });
//             isNewUser = true; // Mark user as new
//           }
//           // Save the user (either newly created or updated with Google ID)
//           await user.save();

//           // 2. Send welcome email if the user is new
//           if (isNewUser) {
//             await sendEmail({
//               email: user.email,
//               subject: 'Welcome to SOBUS!',
//               message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board. If you have any questions, feel free to reach out to us.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
//             });
//           }
//         }

//         // 3. Generate JWT token for the user
//         const token = signToken(user._id);

//         // 4. Return user and token
//         return done(null, { user, token });
//       } catch (err) {
//         // Handle any errors during the authentication process
//         return done(err, null);
//       }
//     },
//   ),
// );

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
//           user = await User.findOne({ email: profile.emails[0].value });
//           if (user) {
//             console.log('Hello :- ', user);
//             user.googleId = profile.id;
//             user.photo = profile.photos[0]?.value || user.photo;
//           } else {
//             user = new User({
//               googleId: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               photo: profile.photos[0]?.value || undefined,
//               role: 'user',
//             });

//             console.log('Hii :- ', user);
//             await user.save();

//             // Asynchronously send the email after creating the user
//             // sendEmail({
//             //   email: user.email,
//             //   subject: 'Welcome to SOBUS!',
//             //   message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
//             // }).catch((err) =>
//             //   console.error('Error sending welcome email:', err),
//             // );

//             // sendEmail({
//             //   email: user.email,
//             //   subject: 'Welcome to SOBUS!',
//             //   message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
//             // })
//             //   .then(() => {
//             //     console.log('Welcome email sent successfully');
//             //   })
//             //   .catch((err) => {
//             //     console.error('Error sending welcome email:', err);
//             //   });
//           }
//         }

//         const token = signToken(user._id);
//         return done(null, { user, token });
//       } catch (err) {
//         return done(err, null);
//       }
//     },
//   ),
// );

/////////////////////////////////////////////////
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

//         // If no user with googleId, check for user with the same email
//         if (!user) {
//           user = await User.findOne({ email: profile.emails[0].value });

//           // If user exists, assign googleId and update photo if necessary
//           if (user) {
//             console.log('Existing user found:', user);
//             user.googleId = profile.id;
//             user.photo = profile.photos[0]?.value || user.photo;
//             await user.save();
//           } else {
//             // If no user found, create a new user
//             user = new User({
//               googleId: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               photo: profile.photos[0]?.value || undefined,
//               role: 'user',
//             });

//             console.log('New user created:', user);
//             await user.save();

//             // Send welcome email asynchronously (non-blocking)
//             sendEmail({
//               email: user.email,
//               subject: 'Welcome to SOBUS!',
//               message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
//             })
//               .then(() => {
//                 console.log('Welcome email sent successfully');
//               })
//               .catch((err) => {
//                 console.error('Error sending welcome email:', err);
//               });
//           }
//         }

//         // Generate token for the authenticated user
//         const token = signToken(user._id);
//         return done(null, { user, token });
//       } catch (err) {
//         console.error('Error during authentication:', err);
//         return done(err, null);
//       }
//     },
//   ),
// );

// module.exports = passport;

// // module.exports = passport;

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
        let user = await User.findOne({ googleId: profile.id });

        // If no user with googleId, check for user with the same email
        if (!user) {
          user = await User.findOne({ email: profile.emails?.[0]?.value });

          if (user) {
            console.log('Existing user found:', user);
            user.googleId = profile.id;
            user.photo = profile.photos?.[0]?.value || user.photo;
            await user.save();
          } else {
            // Create a new user if not found
            try {
              user = new User({
                googleId: profile.id,
                name: profile.displayName || 'Unnamed User',
                email: profile.emails?.[0]?.value || 'unknown@example.com',
                photo: profile.photos?.[0]?.value || undefined,
                role: 'user',
              });

              console.log('New user created:', user);
              await user.save();
            } catch (saveError) {
              console.error('Error saving new user:', saveError);
              return done(saveError, null);
            }

            // Send welcome email asynchronously
            sendEmail({
              email: user.email,
              subject: 'Welcome to SOBUS!',
              message: `Dear ${user.name},\n\nWelcome to SOBUS! We're excited to have you on board.\n\nBest regards,\nSOBUS Team\n\nPlease visit our website: https://sobus.vercel.app`,
            })
              .then(() => {
                console.log('Welcome email sent successfully');
              })
              .catch((emailError) => {
                console.error('Error sending welcome email:', emailError);
              });
          }
        }

        // Generate token after successful login or sign-up
        const token = signToken(user._id);
        return done(null, { user, token });
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
