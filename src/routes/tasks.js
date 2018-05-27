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

module.exports = router;
