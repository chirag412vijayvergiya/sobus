const express = require('express');
const authController = require('../Controllers/authController');
const taskController = require('../Controllers/TaskController');

const router = express.Router();

router.use(authController.protect);

router.get('/', taskController.getMyTasks);
router.patch('/authenticateUser/:id', taskController.submitTask);

router.use(authController.restrictTo('admin'));

router.post('/task-assign/:id', taskController.createTask);
router.patch('/:id/review', taskController.reviewTask);
router.get('/:id', taskController.getTasks);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
