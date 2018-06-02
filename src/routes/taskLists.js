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
  '/getTasklistsForUserAsAuthor',
  middlewares.checkAuthentication,
  TaskListController.getTasklistsForUserAsAuthor
);
router.get(
  '/getTasklistsForUserAsMemeber',
  middlewares.checkAuthentication,
  TaskListController.getTasklistsForUserAsMemeber
);
router.post('/', middlewares.checkAuthentication, TaskListController.create);
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  TaskListController.deleteById
);

module.exports = router;
