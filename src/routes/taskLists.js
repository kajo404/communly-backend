'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TaskListController = require('../controllers/taskList');

router.get('/', middlewares.checkAuthentication, TaskListController.getAll);
router.get(
  '/byId/:id',
  middlewares.checkAuthentication,
  TaskListController.getById
);
router.get(
  '/author/tasklists',
  middlewares.checkAuthentication,
  TaskListController.getTasklistsForUserAsAuthor
);
router.get(
  '/member/tasklists',
  middlewares.checkAuthentication,
  TaskListController.getTasklistsForUserAsMemeber
);
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

module.exports = router;
