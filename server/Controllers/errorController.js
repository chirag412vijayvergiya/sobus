const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/"(.*?[^\\])"/);
  const p = value[0].slice(1, -1);
  const message = `Duplicate feild value:${p}. please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Input Invalid Data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong! ',
    msg: err.message,
  });
};

const sendErrProd = (err, req, res) => {
  // A) API
  // console.log(req.originalUrl);
  // console.log(err.isOperational);
  // console.log(err.message);
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational Error, trusted Error :send mesage to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming ot other unknown eeror : don't leak error details
    //1) Log Error
    console.error('ERROR 💥', err);

    //2) Send a generic error
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // B) RENDERED WEBSITE
  //A) Operational Error, trusted Error :send mesage to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong! ',
      msg: err.message,
    });
  }

  // B) Programming ot other unknown eeror : don't leak error details
  //1) Log Error
  console.error('ERROR 💥', err);
  //2) Send a generic error
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong! ',
    msg: 'Please try again later!',
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // console.log(err);
  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {
      message: err.message,
      name: err.name,
      path: err.path,
      value: err.value,
      code: err.code,
      errmsg: err.errmsg,
      errors: err.errors,
      statusCode: err.statusCode,
      isOperational: err.isOperational,

      // Add other properties as needed
    };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrProd(error, req, res);
  }
};
