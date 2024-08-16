const express = require('express');
const authController = require('../Controllers/authController');
const activityController = require('../Controllers/activityController');

const router = express.Router();

router.use(authController.protect);
// Get all activities for any user

router.get('/all-activities', activityController.getAllActivities);

// Save Excel sheet for the activity with the given ID for the admin
router.post(
  '/save-excel/:id',
  activityController.uploadExcel,
  activityController.saveExcel,
);

// Create activity for admin
router.post(
  '/create-activity',
  authController.restrictTo('admin'),
  activityController.createActivity,
);

// Get activity by ID for any user
router.get('/getActivity/:id', activityController.getActivity);

// Delete activity by ID for admin
router.delete(
  '/delete-activity/:id',
  authController.restrictTo('admin'),
  activityController.deleteActivity,
);

module.exports = router;
