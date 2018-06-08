'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TaskListController = require('../controllers/taskList');

// The order of the declaration is important when the HTTP method is the same,
// Please leave :id/tasks on top
router.get(
  '/:id/tasks',
  middlewares.checkAuthentication,
  TaskListController.getTasks
);
router.get('/:id', middlewares.checkAuthentication, TaskListController.getById);
router.get('/', middlewares.checkAuthentication, TaskListController.getAll);
router.post('/', middlewares.checkAuthentication, TaskListController.create);
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  TaskListController.deleteById
);
router.post(
  '/:id/members',
  middlewares.checkAuthentication,
  TaskListController.addUser
);
router.post(
  '/:id/tasks',
  middlewares.checkAuthentication,
  TaskListController.addTasks
);
router.put(
  '/:id/title',
  middlewares.checkAuthentication,
  TaskListController.updateTitle
);

module.exports = router;
