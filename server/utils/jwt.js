const jwt = require('jsonwebtoken');

const signToken = (id) =>
  // Payload includes the id
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// ******************************************************************************* //

// This function is responsible for creating a JWT using the signToken function and sending it to the client in the form of a cookie.
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure attribute based on environment
    sameSite: 'None', // Set sameSite attribute
  };

  res.cookie('jwt', token, cookiesOptions);

  user.password = undefined;

  //   res.status(statusCode).json({
  //     status: 'success',
  //     token,
  //     data: {
  //       user,
  //     },
  //   });
};

module.exports = { signToken, createSendToken };
