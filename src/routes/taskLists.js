'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TaskListController = require('../controllers/taskList');

router.get('/', middlewares.checkAuthentication, TaskListController.getAll);
router.get('/:id', middlewares.checkAuthentication, TaskListController.getById);
router.post('/', middlewares.checkAuthentication, TaskListController.create);
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  TaskListController.deleteById
);
router.post(
  '/:id/addMember',
  middlewares.checkAuthentication,
  TaskListController.addUser
);
router.post('/:id/addTask', middlewares.checkAuthentication, TaskListController.addTask);

module.exports = router;
