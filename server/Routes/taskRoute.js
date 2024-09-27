const express = require('express');
const authController = require('../Controllers/authController');
const taskController = require('../Controllers/TaskController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));
router.post('/task-assign/:id', taskController.createTask);
router.get('/:id', taskController.getTasks);
router.patch('/:id', taskController.updateTask);

module.exports = router;
