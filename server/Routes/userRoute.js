const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const passport = require('passport');
const { createSendToken } = require('../utils/jwt');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google-auth', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google-auth', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // Generate token and send as a cookie
    // console.log('Authenticated Patient:', req.user);
    // createSendToken(req.user.user, 200, res);
    // console.log('Authenticated Patient:', req);
    const { user } = req.user;
    createSendToken(user, 200, res);
    res.redirect(`${process.env.CLIENT_URL}/home`);
  },
);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.updateMe,
);
router.use(authController.restrictTo('admin'));
router.patch('/make-admin', userController.makeAdmin);
router.route('/');
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
