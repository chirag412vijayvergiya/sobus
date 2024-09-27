const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const GlobalErrorHandler = require('./Controllers/errorController');
const userRouter = require('./Routes/userRoute');
const taskRouter = require('./Routes/taskRoute');
const acitivityRouter = require('./Routes/activityRoute');
const AppError = require('./utils/AppError');

const app = express();
app.set('trust proxy', 1);
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://sobus.vercel.app'],
    credentials: true,
    headers: [
      'Content-Type',
      'Authorization',
      'X-Frame-Options',
      'access-control-allow-origin',
    ],
  }),
);

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  //(dev) is a predefined log format
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 60 minutes
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/activity', acitivityRouter);
app.use('/api/v1/tasks', taskRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
