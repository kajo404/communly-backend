'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TasksController = require('../controllers/tasks');

router.post('/', middlewares.checkAuthentication, TasksController.create);
router.get(
  '/byId/:id',
  middlewares.checkAuthentication,
  TasksController.getAll
);
router.get(
  '/getAllAsignedTasksForUser',
  middlewares.checkAuthentication,
  TasksController.getAllAsignedTasksForUser
);
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  TasksController.deleteById
);

module.exports = router;
