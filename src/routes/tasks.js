'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TasksController = require('../controllers/tasks');

router.get(
  '/byId/:id',
  middlewares.checkAuthentication,
  TasksController.getAll
);

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

router.put(
  '/:taskid',
  middlewares.checkAuthentication,
  TasksController.changeStatus
);

module.exports = router;
