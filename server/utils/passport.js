const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const { signToken } = require('./jwt');
const User = require('../models/userModel');

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
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            role: 'user',
          });
          await user.save();
        }

        const token = signToken(user._id);
        return done(null, { user, token, role: 'user' });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
