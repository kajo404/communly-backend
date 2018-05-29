'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TasksController = require('../controllers/tasks');

router.post(
  '/:taskid/assign/:userid',
  middlewares.checkAuthentication,
  TasksController.assignUser
);

router.delete(
  '/:taskid',
  middlewares.checkAuthentication,
  TasksController.deleteTask
);

module.exports = router;
