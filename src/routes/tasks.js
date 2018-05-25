'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TasksController = require('../controllers/tasks');

router.post('/', middlewares.checkAuthentication, TasksController.create);
router.get('/:id', middlewares.checkAuthentication, TasksController.getAll);
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  TasksController.deleteById
);

module.exports = router;
