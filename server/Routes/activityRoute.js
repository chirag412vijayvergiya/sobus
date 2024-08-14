const express = require('express');
const authController = require('../Controllers/authController');
const activityController = require('../Controllers/activityController');

const router = express.Router();

router.use(authController.protect);
router.get('/all-activities', activityController.getAllActivities);
router.post(
  '/save-excel',
  activityController.uploadExcel,
  activityController.saveExcel,
);
router.post(
  '/create-activity',
  authController.restrictTo('admin'),
  activityController.createActivity,
);

module.exports = router;
