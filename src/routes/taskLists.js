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

module.exports = router;
